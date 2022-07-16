import HttpStatus from 'http-status-codes';
import { userService } from '../services';
import { UserDto } from '../dtos/users';

/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const createUser = async (req, res, next) => {
  try {
    //todo-validate req body
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
    } else {
      res.status(HttpStatus.OK).json({
        data: getUser,
        message: 'User Login successfully'
      });
    }
  } catch (error) {
    next(error);
  }
};
