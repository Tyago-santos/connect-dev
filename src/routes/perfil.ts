import { Router } from 'express';
import { PerfilController } from '../controller/perfilController.js';

const perfilController = new PerfilController();

const router = Router();

router.get('/perfil/:id', perfilController.perfil);
router.get('/follers/:id', perfilController.follers);

export default router;
