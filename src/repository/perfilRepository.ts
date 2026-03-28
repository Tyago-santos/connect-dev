import { db } from '../database/connection.js';
import type { RelationsFrom, RelationsTo } from './relationsRepository.js';
import type { UserRow } from './userRepository.js';

export class PerfilRepository {
  public async getPerfil(id: number) {
    try {
      const rows = await db.query<UserRow>('SELECT * FROM users WHERE id = ?', [
        id,
      ]);
      return rows[0];
    } catch (err) {
      throw err;
    }
  }

  public async getAllPerfilFrom(id: RelationsTo[]) {
    if (!id.length) return [];
    const sql = id.map(() => '?').join(',');
    const idValue = id.map((i) => i.user_to);
    try {
      const rows = await db.query<UserRow>(
        `SELECT id, name, avatar FROM users WHERE id IN (${sql} )`,
        [...idValue],
      );
      return rows;
    } catch (err) {
      throw err;
    }
  }

  public async getAllPerfilTo(id: RelationsFrom[]) {
    if (!id.length) return [];
    const sql = id.map(() => '?').join(',');
    const idValue = id.map((i) => i.user_from);
    try {
      const rows = await db.query<UserRow>(
        `SELECT id, name, avatar FROM users WHERE id IN (${sql} )`,
        [...idValue],
      );
      return rows;
    } catch (err) {
      throw err;
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
      throw err;
    }
  }

  public async createUser(email: string, password: string, name: string) {
    try {
      const result = await db.insert(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?) RETURNING id',
        [name, email, password],
      );

      return {
        id: result.insertId,
        name: name,
        email: email,
      };
    } catch (err) {
      throw err;
    }
  }
}

