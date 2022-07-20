import Post from '../models/post.model';

export const createPost = async (body) => {
  return Post.create(body);
};
