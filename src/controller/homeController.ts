import type { Request, Response } from 'express';
import { activePage } from '../utils/activePage.js';
import { PostService } from '../service/postService.js';

export default class HomeController {
  private service: PostService;

  constructor() {
    this.service = new PostService();
  }

  public index = async (req: Request, res: Response) => {
    const id = req.session.user?.id;

    const posts = await this.service.postsAll(Number(id));

    console.log(posts);
    const active = activePage('home');
    res.render('pages/home', {
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
