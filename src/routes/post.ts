import { type Request, type Response, Router } from 'express';
import { PostController } from '../controller/postController.js';

const postController = new PostController();

const router = Router();

router.post('/post_create_action', postController.createPost);

export default router;
