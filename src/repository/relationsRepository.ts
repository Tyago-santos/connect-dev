import { db } from '../database/connection.js';

export type RelationsTo = {
  user_to: number;
};

export type RelationsFrom = {
  user_from: number;
};

export class RelationsRepository {
  public async relationsFrom(id: number) {
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

  public async relationsTo(id: number) {
    try {
      const rows = await db.query<RelationsFrom>(
        'SELECT user_from FROM user_relations WHERE user_to =?',
        [id],
      );
      return rows;
    } catch (err) {
      throw err;
    }
  }

  public async isRelations(idUser: number, idPerfil: number) {
    try {
      const rows = await db.query<RelationsFrom>(
        'SELECT * FROM user_relations WHERE user_from =? AND user_to=?',
        [idUser, idPerfil],
      );
      return rows[0];
    } catch (err) {
      throw err;
    }
  }

  public async insertFollers(idUser: number, idPerfil: number) {
    try {
      const rows = await db.query<RelationsFrom>(
        'INSERT INTO user_relations (user_from , user_to) VALUES (?, ?) RETURNING id',
        [idUser, idPerfil],
      );
      return rows;
    } catch (err) {
      throw err;
    }
  }

  public async deleteFollers(idUser: number, idPerfil: number) {
    try {
      const rows = await db.query<RelationsFrom>(
        'DELETE FROM  user_relations WHERE user_from =? AND user_to=?',
        [idUser, idPerfil],
      );
      return rows;
    } catch (err) {
      throw err;
    }
  }
}
