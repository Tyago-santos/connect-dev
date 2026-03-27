import { Router } from 'express';
import { ConfigController } from '../controller/configController.js';
import { uploadConfig } from '../utils/uploadConfig.js';

const configController = new ConfigController();

const router = Router();

router.get('/config', configController.config);
router.post('/config_action', uploadConfig.fields([{ name: 'avatar', maxCount: 1 }, { name: 'cover', maxCount: 1 }]), configController.configAction);

export default router;
