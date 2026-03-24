import { Router } from 'express';
import { ConfigController } from '../controller/configController.js';

const configController = new ConfigController();

const router = Router();

router.get('/config', configController.config);

export default router;
