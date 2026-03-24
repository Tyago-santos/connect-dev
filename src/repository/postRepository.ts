import { db } from '../database/connection.js';

type RelationsTo = {
  user_to: number;
};

export class PostRepository {
  public async postFromRelatios(id: number) {
    try {
      const rows = await db.query<RelationsTo>(
        'SELECT user_to FROM user_relations WHERE user_from =?',
        [id],
      );
      return rows;
    } catch (err) {
      console.error(`erro ao pegar posts relacinados to ${err}`);
    }
  }

  public async getAllPost(postsUser: RelationsTo[], id: number) {
    try {
      const userIds = postsUser.map((item) => item.user_to);
      const allIds = [id, ...userIds];
      const placeholders = allIds.map(() => '?').join(',');

      const rows = await db.query<PostRow>(
        `SELECT * FROM posts WHERE id_user IN (${placeholders}) ORDER BY created_at DESC`,
        allIds,
      );
      return rows;
    } catch (err) {
      console.error(`erro ao pegar usúarios ${err}`);
    }
  }

  public async getAllPostUser(id: number) {
    try {
      const rows = await db.query<PostRow>(
        `SELECT * FROM posts WHERE id_user = ? ORDER BY created_at DESC`,
        [id],
      );
      return rows;
    } catch (err) {
      console.error(`erro ao pegar post dos usuário logado ${err}`);
    }
  }

  public async createPost(
    body: string,
    userId: string,
    type: string,
    createAt: string,
  ) {
    //  const result = await db.insert(
    //     'INSERT INTO posts (body, id_user, type, created_at) VALUES (?, ?, ?, ?) RETURNING id',
    //     [body, userId, type, createAt],
    //   );

    // postgress
    try {
      const result = await db.insert(
        'INSERT INTO posts (body, id_user, type, created_at) VALUES (?, ?, ?, ?) ',
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

export interface PostRow {
  id: number;
  body: string;
  id_user: string;
  type: string;
  created_at: string;
}
