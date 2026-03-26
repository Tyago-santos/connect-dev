import { db } from '../database/connection.js';

export class UserRepository {
  public async getAllUsers() {
    try {
      const rows = await db.query<UserRow>('SELECT * FROM users');
      return rows;
    } catch (err) {
      console.error(`erro ao pegar usúarios ${err}`);
    }
  }

  public async getUserByEmail(email: string) {
    try {
      const rows = await db.query<UserRow>(
        'SELECT * FROM users WHERE email = ?',
        [email],
      );

      return rows[0];
    } catch (err) {
      console.error(`erro ao pegar usúario por id ${err}`);
    }
  }

  public async getUserById(id: number) {
    try {
      const rows = await db.query<UserRow>('SELECT * FROM users WHERE id = ?', [
        id,
      ]);

      return rows[0];
    } catch (err) {
      console.error(`erro ao pegar usúario por id ${err}`);
    }
  }

  public async createUser(email: string, password: string, name: string) {
    try {
      const result = await db.insert(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?) ',
        [name, email, password],
      );

      return {
        id: result.insertId,
        name: name,
        email: email,
      };
    } catch (err) {
      console.error(`erro ao criar usuário ${err}`);
      throw err;
    }
  }

  public async updateUserById(
    id: number,
    email: string,
    name: string,
    city: string,
    work: string,
  ) {
    try {
      const result = await db.execute(
        'UPDATE users SET email = ?, name = ?, city = ?, work = ? WHERE id = ?',
        [email, name, city, work, id],
      );

      return {
        affectedRows: result.affectedRows,
      };
    } catch (err) {
      console.error(`erro ao atualizar usuário ${err}`);
      throw err;
    }
  }
}

export interface UserRow {
  id: number;
  name: string;
  password: string;
  email: string;
}
