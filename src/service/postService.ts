import { PostRepository } from '../repository/postRepository.ts';

export class PostService {
  private repository: PostRepository;

  constructor() {
    this.repository = new PostRepository();
  }

  public createPost = async (body: string, id: number) => {
    try {
      const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
      const post = await this.repository.createPost(body, String(id), 'text', date);

      if (post) return post;
    } catch (err) {
      console.error('error ao cria post no service ' + err);
      throw err;

      return false;
    }
  };
}
