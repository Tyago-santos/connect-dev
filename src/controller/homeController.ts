import type { Request, Response } from 'express';
import { activePage } from '../utils/activePage.js';
import { PostService } from '../service/postService.js';
import { PerfilService } from '../service/perfilService.js';

export default class HomeController {
  private servicePost: PostService;
  private servicePerfil: PerfilService;

  constructor() {
    this.servicePost = new PostService();
    this.servicePerfil = new PerfilService();
  }

  public index = async (req: Request, res: Response) => {
    const id = req.session.user?.id;

    const perfilFrom = await this.servicePerfil.getRelationsFrom(Number(id));

    const posts = await this.servicePost.postsAll(Number(id));

    const active = activePage('home');
    res.render('pages/home', {
      countFriends: perfilFrom?.users?.length,
      active,
      posts,
      user: {
        name: req.session.user?.name,
        email: req.session.user?.email,
        id: req.session.user?.id,
      },
    });
  };
}
