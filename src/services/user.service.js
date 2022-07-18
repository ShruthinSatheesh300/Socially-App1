import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

  const authToken = jwt.sign({ email: user.email, id: user.id }, process.env.SECRET_CODE);
  return {
    user,
    authToken
  }
};
