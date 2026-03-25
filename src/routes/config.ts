import { Router } from 'express';
import { ConfigController } from '../controller/configController.js';

const configController = new ConfigController();

const router = Router();

router.get('/config', configController.config);
router.post('/config_action', configController.configAction);

export default router;
