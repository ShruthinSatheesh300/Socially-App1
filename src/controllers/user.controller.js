import HttpStatus from 'http-status-codes';
import { userService } from '../services';
import { UserDto } from '../dtos/users';
import { UserDtoL } from '../dtos/users';
import Joi from '@hapi/joi';

/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const createUser = async (req, res, next) => {
  try {
    const schema = Joi.object({
      firstName: Joi.string()
        .min(4)
        .required()
        .error(Error('Enter a appropriate first name')),
      lastName: Joi.string()
        .min(4)
        .required()
        .error(Error('Enter a appropriate last name')),
      email: Joi.string()
        .email()
        .required()
        .error(Error('Enter a appropriate Email')),
      password: Joi.string().min(6).required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: `Enter valid deatils : ${error}`
      });
    }

    const newUser = await userService.createUser(req.body);
    res.status(HttpStatus.CREATED).json({
      data: new UserDto(newUser),
      message: 'User created successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const userLogin = async (req, res, next) => {
  try {
    const getUser = await userService.getUser(req.body);
    if (getUser == null) {
      res.status(HttpStatus.NOT_FOUND).json({
        message: 'User Doesnt Exists'
      });
    }
    res.status(HttpStatus.OK).json({
      data: new UserDtoL(getUser),
      message: 'Login Successfull'
    });
  } catch (error) {
    next(error);
  }
};
