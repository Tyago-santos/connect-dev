import { type Request, type Response, Router } from 'express';
import { PerfilController } from '../controller/perfilController.js';

const perfilController = new PerfilController();

const router = Router();

router.get('/perfil', perfilController.perfil);

export default router;
