import { db } from '../database/connection.js';

type RelationsTo = {
  user_to: number;
};

type RelationsFrom = {
  user_from: number;
};

export class RelationsRepository {
  public async relatiosFrom(id: number) {
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

  public async RelationsTo(id: number) {
    try {
      const rows = await db.query<RelationsFrom>(
        'SELECT user_from FROM user_relations WHERE user_to =?',
        [id],
      );
      return rows;
    } catch (err) {
      console.error(`erro ao pegar posts relacinados from ${err}`);
    }
  }
}
