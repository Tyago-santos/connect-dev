import { type Request, type Response, Router } from 'express';
import { PhotoController } from '../controller/photoController.ts';

const photoController = new PhotoController();

const router = Router();

router.get('/photos', photoController.photo);

export default router;
