import HttpStatus from 'http-status-codes';
import { postService } from '../services';
import { PostDto } from '../dtos/posts';

export const createPost = async (req, res, next) => {
  try {
    const { content, user } = req.body;
    if (content === '') {
      throw new Error('Content is required');
    }

    const newPostDetails = {
      content,
      creator: user.userId
    };
    const newPost = await postService.createPost(newPostDetails);

    res.status(HttpStatus.CREATED).json({
      data: new PostDto(newPost),
      message: 'Post created successfully'
    });
  } catch (error) {
    next(error);
  }
};
