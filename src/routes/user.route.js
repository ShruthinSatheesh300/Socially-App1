import express from 'express';
import { userController } from '../controllers';
import { userAuth } from '../middlewares/auth.middleware';
const router = express.Router();

//route to create a new user
router.post('/', userController.createUser);

//route for user login
router.get('/', userController.getUser);

router.get('/:userId/posts', userAuth, userController.getUserPosts);

//route for following
router.put('/:followId/follow',userAuth,userController.followUser);

//route for unfollowing
router.put('/:followId/unfollow',userAuth,userController.unFollowUser)

export default router;
