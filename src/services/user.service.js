import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

//create new user
export const createUser = async (body) => {
  const { email, password } = body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Error('User already exists');
  }

  const hashSalt = parseInt(process.env.HASH_SALT, 10);
  const hashPassword = bcrypt.hashSync(password, hashSalt);
  body.password = hashPassword;
  return User.create(body);
};

//Login
export const getUser = async (body) => {
  const { email, password } = body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User doesnt exist');
  }
  const passwordMatches = bcrypt.compareSync(password, user.password);

  if (!passwordMatches) {
    throw new Error('Password is Invalid');
  }

  const authToken = jwt.sign(
    { email: user.email, id: user._id },
    process.env.SECRET_CODE
  );
  return {
    user,
    authToken
  };
};

export const followUser = async (body) => {
  const { userId } = body;
  const followId = Types.ObjectId(body.followId);
  const user = await User.find({ _id: followId });
  if (!user) {
    throw new Error('User doesnt Exist');
  }
  const follower = await User.findByIdAndUpdate(
    {
      _id: followId
    },
    {
      $push: { followers: userId }
    },

    { new: true }
  );
  const following = await User.findByIdAndUpdate(
    {
      _id: userId
    },
    {
      $push: { following: followId }
    },
    {
      new: true
    }
  );
  return follower, following;
};

export const unFollowUser = async (body) => {
  const { userId } = body;
  const followId = Types.ObjectId(body.followId);
  const user = await User.find({ _id: followId });
  if (!user) {
    throw new Error('User doesnt Exist');
  }
  const follower = await User.findByIdAndUpdate(
    {
      _id: followId
    },
    {
      $pull: { followers: userId }
    },

    { new: true }
  );
  const following = await User.findByIdAndUpdate(
    {
      _id: userId
    },
    {
      $pull: { following: followId }
    },
    {
      new: true
    }
  );
  return follower, following;
};

