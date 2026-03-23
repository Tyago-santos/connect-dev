import { Router } from 'express';
import { PhotoController } from '../controller/photoController.js';

const photoController = new PhotoController();

const router = Router();

router.get('/photos/:id', photoController.photo);

export default router;
