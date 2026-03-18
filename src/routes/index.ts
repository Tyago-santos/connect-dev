import express, { Router } from 'express';
import HomeController from '../controller/homeController.ts';
import authUser from './authUser/auth.ts';
const homeController = new HomeController();

const router = Router();

router.use(authUser);
router.get('/', homeController.index);

export default router;
