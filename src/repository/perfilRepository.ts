import { db } from '../database/connection.js';

export class PerfilRepository {
  public async getPerfil(id: number) {
    try {
      const rows = await db.query<UserRow>('SELECT * FROM users WHERE id = ?', [
        id,
      ]);
      return rows[0];
    } catch (err) {
      console.error(`erro ao pegar perfil de usúario ${err}`);
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
}

interface UserRow {
  id: number;
  name: string;
  password: string;
  email: string;
  city: string;
  birthdate: string;
  work: string;
}
