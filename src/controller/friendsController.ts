import type { Request, Response } from 'express';
import { activePage } from '../utils/activePage.js';
import { PerfilService } from '../service/perfilService.js';

export class FriendsController {
  private service: PerfilService;

  constructor() {
    this.service = new PerfilService();
  }
  public friends = async (req: Request, res: Response) => {
    const id = req.session.user?.id;
    
    const active = activePage('friends');

    const perfilTo = await this.service.getRelationsTo(Number(id));
    const perfilFrom = await this.service.getRelationsFrom(Number(id));

    console.log(perfilTo?.users);
    console.log(perfilFrom?.users);

    return res.render('pages/friends', {
      active,
      usersTo: perfilTo?.users,
      usersFrom: perfilFrom?.users,
      user: {
        name: req.session.user?.name,
        email: req.session.user?.email,
        id: req.session.user?.id,
      },
    });
  };
}
