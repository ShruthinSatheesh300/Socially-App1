import HttpStatus from 'http-status-codes';
import { postService } from '../services';
import { PostDto } from '../dtos/posts';

export const createPost = async (req, res, next) => {
  try {
    const newPost = await postService.createPost(req.body);
    res.status(HttpStatus.CREATED).json({
      data: new PostDto(newPost),
      message: 'Post created successfully'
    });
  } catch (error) {
    next(error);
  }
};
