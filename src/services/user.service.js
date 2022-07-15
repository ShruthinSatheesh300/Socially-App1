import User from '../models/user.model';
import bcrypt from 'bcrypt'


//create new user
export const newUser = async (body) => {
  const user = await User.findOne({ email: body.email })
  console.log(user)
  if (user === null) {
    const saltRound = 10;
    const hashPassword = bcrypt.hashSync(body.password, saltRound);
    body.password = hashPassword
    const data = await User.create(body);
    return data;
  } else {
    throw new Error('Email is already registered')
  }
};

