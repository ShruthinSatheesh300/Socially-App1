import express from 'express';
import { userController } from '../controllers';
const router = express.Router();

//route to create a new user
router.post('/', userController.createUser);

//route for user login
router.get('/', userController.userLogin);

export default router;
