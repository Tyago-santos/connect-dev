import type { Request, Response } from 'express';
import { activePage } from '../utils/activePage.js';

export class FriendsController {
  public friends = (req: Request, res: Response) => {


    const active = activePage('friends');

    return res.render('pages/friends', {
      active,
       user: {
        name: req.session.user?.name,
        email: req.session.user?.email,
        id: req.session.user?.id,
      },
    });
  };
}
