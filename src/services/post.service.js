import Post from '../models/post.model';
import { Types } from 'mongoose';

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

export const updateLikes = async (body) => {
  const { userId } = body;
  const postId = Types.ObjectId(body.postId);

  const posts = await Post.findOne({ _id: postId });
  if (!posts) {
    throw new Error('Post Not Found');
  }

  let query = {
    $push: { likes: userId }
  };
  if (posts.likes.includes(userId)) {
    query = {
      $pull: { likes: userId }
    };
  }

  const likes = await Post.findByIdAndUpdate(
    {
      _id: postId
    },
    query,
    { new: true }
  );
  return likes;
};
