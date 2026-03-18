import { type Request, type Response, Router } from 'express';
import { AuthUserController } from '../../controller/authUserController.ts';

const router = Router();

const authUserController = new AuthUserController();

router.get('/login', authUserController.login);
router.get('/login_action', authUserController.loginAction);

export default router;
