import User from '../models/user.model';
import bcrypt from 'bcrypt'


//create new user
export const newUser = async (body) => {
  const saltRound = 10;
  const hashPassword = bcrypt.hashSync(body.password, saltRound);
  body.password = hashPassword
  const data = await User.create(body);
  return data;
};

