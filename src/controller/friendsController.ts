import type { Request, Response } from 'express';
import { activePage } from '../utils/activePage.ts';

export class FriendsController {
  public friends = (req: Request, res: Response) => {
    const active = activePage('friends');

    return res.render('pages/friends', {
      active,
    });
  };
}
