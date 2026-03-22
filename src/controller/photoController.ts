import type { Request, Response } from 'express';
import { activePage } from '../utils/activePage.js';

export class PhotoController {
  public photo = (req: Request, res: Response) => {
    const active = activePage('photo');

    return res.render('pages/photo', {
      active,
      user: {
        name: req.session.user?.name,
        email: req.session.user?.email,
        id: req.session.user?.id,
      },
    });
  };
}
