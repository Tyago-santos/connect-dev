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
      throw err;
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
      throw err;
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
      throw err;
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
      throw err;
    }
  }

  public async getLikePost(idPost: number): Promise<number | undefined> {
    //  const result = await db.insert(
    //     'INSERT INTO posts (body, id_user, type, created_at) VALUES (?, ?, ?, ?) RETURNING id',
    //     [body, userId, type, createAt],
    //   );

    // postgress
    try {
      const result = await db.query<{ c: number | string }>(
        'SELECT COUNT(*) AS c FROM postlikes WHERE id_post = ?  ',
        [idPost],
      );

      const count = result?.[0]?.c ?? 0;
      return typeof count === 'string' ? Number(count) : count;
    } catch (err) {
      throw err;
    }
  }

  public async getIsLikedPost(idPost: number, idUser: number) {
    //  const result = await db.insert(
    //     'INSERT INTO posts (body, id_user, type, created_at) VALUES (?, ?, ?, ?) RETURNING id',
    //     [body, userId, type, createAt],
    //   );

    // postgress
    try {
      const result = await db.query(
        'SELECT 1 FROM postlikes WHERE id_post = ? AND id_user = ? LIMIT 1',
        [idPost, idUser],
      );

      return result;
    } catch (err) {
      throw err;
    }
  }

  public postLikeToogle = async (idPost: number, idUser: number) => {
    try {
      const postLike = await this.getIsLikedPost(idPost, idUser);
      const isLiked = Array.isArray(postLike) && postLike.length > 0;

      if (isLiked) {
        await db.insert(
          'DELETE FROM postlikes WHERE id_post = ? AND id_user = ?',
          [idPost, idUser],
        );
      } else {
        await db.insert(
          'INSERT INTO postlikes (id_post, id_user, created_at) VALUES (?, ?, NOW()) RETURNING id',
          [idPost, idUser],
        );
      }
    } catch (err) {
      throw err;
    }
  };

  public async getCommentPost(idPost: number) {
    try {
      const rows = await db.query<PostCommentRow>(
        `SELECT * FROM postscomments WHERE id_post = ?`,
        [idPost],
      );
      return rows;
    } catch (err) {
      throw err;
    }
  }

  public async addCommentPost(pc: PostCommentRow) {
    try {
      const rows = await db.query<PostCommentRow>(
        `INSERT INTO postscomments (id_post, id_user, body, created_at) VALUES (?, ?, ?, ?)`,
        [pc.id_post, pc.id_user, pc.body, pc.created_at],
      );
      return rows;
    } catch (err) {
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

export interface PostCommentRow {
  id: number;
  id_post: number;
  id_user: number | string;
  body: string;
  created_at: string;
}
