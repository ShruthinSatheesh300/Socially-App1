import { body } from 'express-validator';
import Post from '../models/post.model';

export const createPost = async (body) => {
  return await Post.create(body);
};

export const getUserPosts = async (body) => {
  const { userId } = body;

  return await Post.find({ creator: userId });
};

export const getPosts = async (body) => {
  const { page, limit } = body;

  return await Post.find(null, null, {
    sort: {
      createdAt: -1
    }
  })
    .populate('creator', 'firstName lastName email')
    .limit(limit * 1)
    .skip((page - 1) * limit);
};
