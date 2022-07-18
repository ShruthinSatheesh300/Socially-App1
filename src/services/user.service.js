import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//create new user
export const createUser = async (body) => {
  const { email, password } = body;
  const user = await User.findOne({ email });

  if (user !== null) {
    throw new Error('User already exists');
  }
  
  const hashSalt = 10;
  const hashPassword = bcrypt.hashSync(password, hashSalt);
  body.password = hashPassword;
  return User.create(body);
};

//Login
export const getUser = async (body) => {
  const user = await User.findOne({ email: body.email });
  if (user == null) {
    throw new Error('User not registered');
  } else {
    const checkPassword = bcrypt.compareSync(body.password, user.password);

    if (checkPassword) {
      const data = jwt.sign(
        { email: user.email, id: user.id },
        process.env.SECRET_CODE
      );
      return data;
    } else {
      throw new Error('Password is Invalid');
    }
  }
};
