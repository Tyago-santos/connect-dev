import type { Request, Response } from 'express';
import { activePage } from '../utils/activePage.js';
import { PerfilService } from '../service/perfilService.js';
import { PostService } from '../service/postService.js';

// interface UserInforType {
// id: number;
// name: string;
// password: string;
// email: string;
// }

export class PerfilController {
  private servicePerfil: PerfilService;
  private servicePost: PostService;
  constructor() {
    this.servicePerfil = new PerfilService();
    this.servicePost = new PostService();
  }
  public perfil = async (req: Request, res: Response) => {
    const active = activePage('perfil');
    const { id } = req.params;

    if (id) {
      const userInfor = await this.servicePerfil.getPerfil(Number(id));
      const usersFrom = await this.servicePerfil.getRelationsFrom(Number(id));

      return res.render('pages/perfil', {
        active,
        user: userInfor?.user,
        users: usersFrom?.users,
        relations: {
          to: userInfor?.relationsTo.length,
          from: userInfor?.relationsFrom.length,
        },
      });
    }
  };
}
