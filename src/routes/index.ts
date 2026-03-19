import express, { Router } from 'express';
import HomeController from '../controller/homeController.ts';
import authUser from './authUser/auth.ts';
import perfilRoutes from './perfilRouter/perfil.ts';
import friendsRoutes from './friendsRouter/friends.ts';
import photoRoutes from './photoRouter/photo.ts';
const homeController = new HomeController();

const router = Router();

router.use(authUser);
router.use(perfilRoutes);
router.use(friendsRoutes);
router.use(photoRoutes);

router.get('/', homeController.index);

export default router;
