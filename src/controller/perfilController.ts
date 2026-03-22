import type { Request, Response } from 'express';
import { activePage } from '../utils/activePage.js';
import { PerfilService } from '../service/perfilService.js';

// interface UserInforType {
// id: number;
// name: string;
// password: string;
// email: string;
// }

export class PerfilController {
  private service: PerfilService;

  constructor() {
    this.service = new PerfilService();
  }
  public perfil = async (req: Request, res: Response) => {
    const active = activePage('perfil');
    const { id } = req.params;

    if (id) {
      const userInfor = await this.service.getPerfil(Number(id));

      console.log(userInfor);

      return res.render('pages/perfil', {
        active,
        userInfor,
        user: {
          name: req.session.user?.name,
          email: req.session.user?.email,
          id: req.session.user?.id,
        },
      });
    }
  };
}
