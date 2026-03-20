import { db } from '../database/connection.js';
export class PostRepository {
  public async getAllPost() {
    try {
      const rows = await db.query<PostRow>('SELECT * FROM users');
      return rows;
    } catch (err) {
      console.error(`erro ao pegar usúarios ${err}`);
    }
  }

  public async createPost(body: string, userId: string, type: string, createAt: string) {
    try {
      const result = await db.insert(
        'INSERT INTO posts (body, id_user, type, created_at) VALUES (?, ?, ?, ?) RETURNING id',
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

interface PostRow {
  id: number;
  body: string;
  id_user: string;
  type: string;
  created_at: string;
}
