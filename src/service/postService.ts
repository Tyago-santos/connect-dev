import { PostRepository, type PostRow } from '../repository/postRepository.js';
import { UserRepository } from '../repository/userRepository.js';

export class PostService {
  private repository: PostRepository;
  private userRepository: UserRepository;

  constructor() {
    this.repository = new PostRepository();
    this.userRepository = new UserRepository();
  }

  public postsAll = async (
    id: number,
  ): Promise<PostRow[] | false | undefined> => {
    const postsRelations = await this.repository.postFromRelatios(id);

    if (postsRelations) {
      const posts = await this.repository.getAllPost(postsRelations, id);
      const formattedPosts = posts
        ? await Promise.all(
            posts.map(async (post) => {
              const date = new Date(post.created_at);
              const day = String(date.getDate()).padStart(2, '0');
              const month = String(date.getMonth() + 1).padStart(2, '0');
              const year = date.getFullYear();

              const likeCount = await this.repository.getLikePost(post.id);
              const isLiked = await this.repository.getIsLikedPost(
                post.id,
                +post.id_user,
              );

              const postComment = await this.repository.getCommentPost(post.id);
              const postCommentWithUser = postComment
                ? await Promise.all(
                    postComment.map(async (comment) => {
                      const user =
                        comment.id_user != null
                          ? await this.userRepository.getUserById(
                              Number(comment.id_user),
                            )
                          : undefined;

                      return {
                        ...comment,
                        user,
                      };
                    }),
                  )
                : undefined;

              const user =
                post.id_user != null
                  ? await this.userRepository.getUserById(Number(post.id_user))
                  : null;

              const postAvatar =
                user?.avatar !== '0'
                  ? user?.avatar
                  : '/media/avatars/avatar.jpg';

              return {
                ...post,
                isLiked: isLiked.length > 0 ? true : false,
                likeCount: likeCount ?? 0,
                created_at: `${day}/${month}/${year}`,
                postComment: postCommentWithUser,
                countComment: postComment?.length ?? 0,
                user: user ?? undefined,
                postAvatar,
              };
            }),
          )
        : undefined;
      return formattedPosts ? formattedPosts : false;
    }
  };

  public postAllUser = async (
    id: number,
  ): Promise<PostRow[] | false | undefined> => {
    const posts = await this.repository.getAllPostUser(id);

    if (posts) {
      const formattedPosts = await Promise.all(
        posts.map(async (post) => {
          const date = new Date(post.created_at);
          const day = String(date.getDate()).padStart(2, '0');
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const year = date.getFullYear();

          const likeCount = await this.repository.getLikePost(post.id);
          const isLiked = await this.repository.getIsLikedPost(
            post.id,
            +post.id_user,
          );

          const postComment = await this.repository.getCommentPost(post.id);
          const postCommentWithUser = postComment
            ? await Promise.all(
                postComment.map(async (comment) => {
                  const user =
                    comment.id_user != null
                      ? await this.userRepository.getUserById(
                          Number(comment.id_user),
                        )
                      : undefined;

                  return {
                    ...comment,
                    user,
                  };
                }),
              )
            : undefined;

          const user =
            post.id_user != null
              ? await this.userRepository.getUserById(Number(post.id_user))
              : null;

          const postAvatar = user?.avatar
            ? user.avatar
            : '/media/avatars/avatar.jpg';

          return {
            ...post,
            isLiked: isLiked.length > 0 ? true : false,
            likeCount: likeCount ?? 0,
            created_at: `${day}/${month}/${year}`,
            postComment: postCommentWithUser,
            countComment: postComment?.length ?? 0,
            user: user ?? undefined,
            postAvatar,
          };
        }),
      );
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
