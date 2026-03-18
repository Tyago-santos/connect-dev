import type { RowDataPacket } from 'mysql2';
import { connection } from '../database/connection.ts';
import type { Pool } from 'mysql2/promise';

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

  public async createUser(email: string, password: string, name: string, birthdate: Date) {
    try {
      const [rows] = await (
        await this.conn
      ).query<Database.UserRow[]>(
        'INSERT INTO users (name, email, password, birthdate) VALUES (?, ? ,? , ?',
        [name, password, email, birthdate],
      );
    } catch (err) {
      console.error(`erro ao criar usúario ${err}`);
    }
  }
}
