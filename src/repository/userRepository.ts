import type { RowDataPacket } from 'mysql2';
import { connection } from '../database/connection.js';
import type { Pool, ResultSetHeader } from 'mysql2/promise';

interface UserRow extends RowDataPacket {
  id: number;
  name: string;
  password: string;
  email: string;
}

export namespace Database {
  // Interface para a tabela de usuários
  export interface UserRow extends RowDataPacket {
    id: number;
    name: string;
    password: string;
    email: string;
  }

  // Tipo para o Pool (caso queira centralizar)
  export type Connection = Pool;
}
export class UserRepository {
  private conn: Database.Connection;

  constructor() {
    this.conn = connection();
  }
  public async getAllUsers() {
    try {
      const [rows] = await this.conn.execute('SELECT * FROM  users');
      return rows;
    } catch (err) {
      console.error(`erro ao pegar usúarios ${err}`);
    }
  }

  public async getUserByEmail(email: string) {
    try {
      const [rows] = await this.conn.execute<Database.UserRow[]>(
        'SELECT * FROM users WHERE email = ?',
        [email],
      );

      return rows[0];
    } catch (err) {
      console.error(`erro ao pegar usúario por id ${err}`);
    }
  }

  public async createUser(email: string, password: string, name: string) {
    try {
      // 1. O retorno de um INSERT é ResultSetHeader, não um array de linhas
      const [result] = await (
        await this.conn
      ).execute<ResultSetHeader>(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, password], // Removi o birthdate para bater com os argumentos da função
      );

      // 2. O result tem o 'insertId'. O MySQL NÃO retorna os dados inseridos no INSERT.
      return {
        id: result.insertId,
        name: name,
        email: email,
      };
    } catch (err) {
      console.error(`erro ao criar usuário ${err}`);
      throw err; // Importante para o AuthService saber que falhou
    }
  }
}
