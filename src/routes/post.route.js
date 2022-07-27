import express from 'express';
import { postController } from '../controllers';
import { userAuth } from '../middlewares/auth.middleware';
const router = express.Router();

//route to create a new post
router.post('/', userAuth, postController.createPost);

export default router;
