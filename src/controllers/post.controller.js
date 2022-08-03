import HttpStatus from 'http-status-codes';
import { postService } from '../services';
import { PostDto } from '../dtos/posts';
import { validatePost } from '../validators';

export const createPost = async (req, res, next) => {
  try {
    const { content, user } = req.body;
    const validationPayload = {
      content
    };

    const error = validatePost(validationPayload);
    if (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: `${error}`
      });
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

export const getPosts = async (req, res, next) => {
  try {
    const { page = 1, limit = 2 } = req.query;
    const posts = await postService.getPosts({ page, limit });
    const results = posts.map((post) => new PostDto(post));
    res.status(HttpStatus.OK).json({
      data: results,
      message: 'All Posts fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};
