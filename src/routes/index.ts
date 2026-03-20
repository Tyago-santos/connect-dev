import express, { Router } from 'express';
import HomeController from '../controller/homeController.js';
import authUser from './auth.js';
import perfilRoutes from './perfil.js';
import friendsRoutes from './friends.js';
import photoRoutes from './photo.js';
import postRoutes from './post.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
const homeController = new HomeController();

const router = Router();

router.use(authUser);
router.use(authMiddleware);
router.use(perfilRoutes);
router.use(friendsRoutes);
router.use(photoRoutes);
router.use(postRoutes);

router.get('/', homeController.index);

export default router;
