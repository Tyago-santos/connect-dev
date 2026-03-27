import type { Request, Response } from 'express';
import { PostService } from '../service/postService.js';
import { PostRepository } from '../repository/postRepository.js';

export interface PostCommentRow {
  id: number;
  id_post: number;
  id_user: number | string;
  body: string;
  created_at: string;
}

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

      if (post) return res.redirect('/');
    }
  };

  public postLike = async (req: Request) => {
    const id = req.params.id;
    const idUser = req.session.user?.id;

    if (id && idUser) {
      await this.repository.postLikeToogle(+id, +idUser);
    }
  };

  public postComment = async (req: Request, res: Response) => {
    const { id, txt } = req.body;

    if (id && txt) {
      const data = new Date().toISOString().slice(0, 19).replace('T', ' ');

      const newComment = {
        id_post: id,
        id_user: req.session.user?.id,
        body: txt,
        created_at: data,
      } as PostCommentRow;

      await this.repository.addCommentPost(newComment);

      res.json({
        name: req.session.user?.name,
        body: newComment.body,
        link: '/perfil',
        avatar: req.session.user?.avatar || '/media/avatars/avatar.jpg',
      });
    }
  };


}
