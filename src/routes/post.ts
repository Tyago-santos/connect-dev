import { Router } from 'express';
import multer from 'multer';
import { PostController } from '../controller/postController.js';

const postController = new PostController();
const upload = multer();

const router = Router();

router.post('/post_create_action', upload.none(), postController.createPost);
router.post('/ajax_comment', upload.none(), postController.postComment);
router.get('/ajax_like/:id', postController.postLike);

export default router;
