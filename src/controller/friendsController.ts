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

    const { id: idUser } = req.params;

    if (idUser) {
      const userInfor = await this.service.getPerfil(Number(idUser));

      return res.render('pages/friends', {
        active,
        countFriends: userInfor?.relationsFrom.length,
        usersTo: perfilTo?.users,
        usersFrom: perfilFrom?.users,
        perfilAvatar:
          !req.session.user?.avatar || req.session.user.avatar === '0'
            ? '/media/avatars/avatar.jpg'
            : req.session.user.avatar,
        relations: {
          to: userInfor?.relationsTo.length,
          from: userInfor?.relationsFrom.length,
        },
        user: userInfor?.user,
      });
    }
  };
}
