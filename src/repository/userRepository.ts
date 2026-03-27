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

  public async getUserByNameOrEmail(search: string) {
    try {
      const rows = await db.query<UserRow>(
        'SELECT id, name, email, birthdate, avatar, cover, city, work FROM users WHERE name LIKE ? OR email LIKE ? LIMIT 20',
        [`%${search}%`, `%${search}%`],
      );
      return rows;
    } catch (err) {
      console.error(`erro ao buscar usuários ${err}`);
      return [];
    }
  }

  public async createUser(
    email: string,
    password: string,
    name: string,
    birthdate: string,
  ) {
    try {
      const birthdateFormatted = new Date(birthdate)
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ');

      const result = await db.insert(
        'INSERT INTO users (name, email, password, birthdate) VALUES (?, ?, ?, ?)',
        [name, email, password, birthdateFormatted],
      );

      const birthdateDate = new Date(birthdateFormatted);

      return {
        id: result.insertId,
        name: name,
        email: email,
        birthdate: birthdateDate,
      };
    } catch (err) {
      console.error(`erro ao criar usuário ${err}`);
      throw err;
    }
  }

  public findByName = async (name: string) => {
    try {
      const result = await db.query(
        'SELECT * FROM users WHERE name LIKE %?% ',
        [name],
      );

      return result;
    } catch (err) {
      console.error(`erro ao criar usuário ${err}`);
      throw err;
    }
  };

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
  birthdate: Date;
  avatar?: string;
  cover?: string;
  city?: string;
  work?: string;
}
