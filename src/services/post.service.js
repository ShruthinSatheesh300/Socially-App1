import Post from '../models/post.model';

export const createPost = async (body) => {
  return await Post.create(body);
};
