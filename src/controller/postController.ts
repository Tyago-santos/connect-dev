import type { Request, Response } from 'express';
import { PostService } from '../service/postService.ts';
export class PostController {
  private service: PostService;

  constructor() {
    this.service = new PostService();
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
}
