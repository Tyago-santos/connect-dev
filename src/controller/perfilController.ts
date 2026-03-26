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

      const isFollers = id
        ? await this.servicePerfil.isRelationsService(+id, +idUser)
        : false;

      const userFollers = id !== +idUser ? true : false;

      console.log(isFollers);

      return res.render('pages/perfil', {
        active,
        countFriends: userInfor?.relationsFrom.length,
        userPosts,
        user: userInfor?.user,
        users: usersFrom?.users,
        userFollers,
        follers: isFollers,
        relations: {
          to: userInfor?.relationsTo.length,
          from: userInfor?.relationsFrom.length,
        },
      });
    }
  };

  public follers = async (req: Request, res: Response) => {
    const id = req.params.id;
    const userId = req.session.user?.id;

    if (id && userId)
      await this.servicePerfil.follerDeleteAndInsert(+userId, +id);

    res.redirect('/perfil/' + id);
  };
}
