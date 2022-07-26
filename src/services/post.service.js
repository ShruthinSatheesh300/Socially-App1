import Post from '../models/post.model';

export const createPost = async (body) => {
  return await Post.create(body);
};

export const getUserPosts = async (body) => {
  const { userId } = body;

  return await Post.find({ creator:userId }).populate('creator');
};
