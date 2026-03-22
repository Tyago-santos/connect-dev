import { PostRepository, type PostRow } from '../repository/postRepository.js';

export class PostService {
  private repository: PostRepository;

  constructor() {
    this.repository = new PostRepository();
  }

  public postsAll = async (
    id: number,
  ): Promise<PostRow[] | false | undefined> => {
    const postsRelations = await this.repository.postFromRelatios(id);
    if (postsRelations) {
      const posts = await this.repository.getAllPost(postsRelations, id);
      const formattedPosts = posts?.map((post) => {
        const date = new Date(post.created_at);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return {
          ...post,
          created_at: `${day}/${month}/${year}`,
        };
      });
      return formattedPosts ? formattedPosts : false;
    }
  };

  public createPost = async (body: string, id: number) => {
    try {
      const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
      const post = await this.repository.createPost(
        body,
        String(id),
        'text',
        date,
      );

      if (post) return post;
    } catch (err) {
      console.error('error ao cria post no service ' + err);
      throw err;

      return false;
    }
  };
}
