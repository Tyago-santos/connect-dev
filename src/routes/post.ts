import { Router } from 'express';
import { PostController } from '../controller/postController.js';

const postController = new PostController();

const router = Router();

router.post('/post_create_action', postController.createPost);
router.get('/ajax_like/:id', postController.postLike);

export default router;
