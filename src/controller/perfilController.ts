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
    const { id: idUser } = req.params;
    const id = req.session.user?.id;

    const userPosts = await this.servicePost.postAllUser(Number(id));

    if (idUser) {
      const userInfor = await this.servicePerfil.getPerfil(Number(idUser));
      const usersFrom = await this.servicePerfil.getRelationsFrom(
        Number(idUser),
      );

      return res.render('pages/perfil', {
        active,
        countFriends: userInfor?.relationsFrom.length,
        userPosts,
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
