import type { Request, Response } from 'express';
import { PostService } from '../service/postService.js';
import { PostRepository } from '../repository/postRepository.js';
export class PostController {
  private service: PostService;
  private repository: PostRepository;

  constructor() {
    this.service = new PostService();
    this.repository = new PostRepository();
  }
  public createPost = async (req: Request, res: Response) => {
    const { body } = req.body;

    const id = req.session.user?.id;

    if (body && id) {
      const post = await this.service.createPost(body, id);
      console.log('chegou');

      if (post) return res.redirect('/');
    }
  };

  public postLike = (req: Request, res: Response) => {
    const id = req.params.id;
    const idUser = req.session.user?.id;

    if (id && idUser) {
      this.repository.postLikeToogle(+id, +idUser);
      res.redirect('/');
    }
  };
}
