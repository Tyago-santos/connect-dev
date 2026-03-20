import express, { Router } from 'express';
import HomeController from '../controller/homeController.ts';
import authUser from './auth.ts';
import perfilRoutes from './perfil.ts';
import friendsRoutes from './friends.ts';
import photoRoutes from './photo.ts';
import postRoutes from './post.ts';
import { authMiddleware } from '../middleware/authMiddleware.ts';
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
