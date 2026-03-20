import type { RowDataPacket } from 'mysql2';
import { connection } from '../database/connection.js';
import type { Pool, ResultSetHeader } from 'mysql2/promise';

export namespace Database {
  export interface UserRow extends RowDataPacket {
    id: number;
    name: string;
    password: string;
    email: string;
  }

  export type Connection = Pool;
}
export class PostRepository {
  private conn: Database.Connection;

  constructor() {
    this.conn = connection();
  }
  public async getAllPost() {
    try {
      const [rows] = await this.conn.execute('SELECT * FROM  users');
      return rows;
    } catch (err) {
      console.error(`erro ao pegar usúarios ${err}`);
    }
  }

  public async createPost(body: string, userId: string, type: string, createAt: string) {
    try {
      const [result] = await (
        await this.conn
      ).execute<ResultSetHeader>(
        'INSERT INTO posts (body, id_user,type, created_at) VALUES (?, ?, ?,?)',
        [body, userId, type, createAt],
      );

      return {
        id: result.insertId,
        body,
        userId,
        type,
        createAt,
      };
    } catch (err) {
      console.error(`erro ao criar post com body ${err}`);
      throw err;
    }
  }
}
