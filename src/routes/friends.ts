import { Router } from 'express';
import { FriendsController } from '../controller/friendsController.js';

const friendsController = new FriendsController();

const router = Router();

router.get('/friends/:id', friendsController.friends);

export default router;
