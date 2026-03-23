import type { Request, Response } from 'express';
import { activePage } from '../utils/activePage.js';
import { PerfilService } from '../service/perfilService.js';

export class PhotoController {
  private service: PerfilService;

  constructor() {
    this.service = new PerfilService();
  }
  public photo = async (req: Request, res: Response) => {
    const active = activePage('photo');
    const { id: idUser } = req.params;

    if (idUser) {
      const userInfor = await this.service.getPerfil(Number(idUser));

      return res.render('pages/photo', {
        active,
        relations: {
          to: userInfor?.relationsTo.length,
          from: userInfor?.relationsFrom.length,
        },
        user: userInfor?.user,
      });
    }
  };
}
