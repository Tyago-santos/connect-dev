import type { Request, Response } from 'express';
import { activePage } from '../utils/activePage.js';
import { PostService } from '../service/postService.js';
import { PerfilService } from '../service/perfilService.js';
import { UserRepository, type UserRow } from '../repository/userRepository.js';

export default class HomeController {
  private servicePost: PostService;
  private servicePerfil: PerfilService;
  private repository: UserRepository;

  constructor() {
    this.servicePost = new PostService();
    this.servicePerfil = new PerfilService();
    this.repository = new UserRepository();
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

  public search = async (req: Request, res: Response) => {
    const search = req.query.s as string;
    const id = req.session.user?.id;

    const perfilFrom = await this.servicePerfil.getRelationsFrom(Number(id));
    const active = activePage('search');

    let users: UserRow[] = [];
    if (search && search.length > 0) {
      users = await this.repository.getUserByNameOrEmail(search);
    }

    res.render('pages/search', {
      searchTerm: search || '',
      users,
      countFriends: perfilFrom?.users?.length,
      active,
      user: {
        name: req.session.user?.name,
        email: req.session.user?.email,
        id: req.session.user?.id,
      },
    });
  };
}
