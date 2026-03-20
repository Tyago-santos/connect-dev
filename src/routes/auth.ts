import { type Request, type Response, Router } from 'express';
import { AuthUserController } from '../controller/authUserController.ts';

const router = Router();

const authUserController = new AuthUserController();

router.get('/login', authUserController.login);
router.post('/login_action', authUserController.loginAction);
router.get('/register', authUserController.register);
router.post('/register_action', authUserController.registerAction);

export default router;
