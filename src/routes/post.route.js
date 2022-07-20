import express from 'express';
import { postController } from '../controllers';
const router = express.Router();

//route to create a new post
router.post('/', postController.createPost);

export default router;
