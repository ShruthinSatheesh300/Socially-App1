import HttpStatus from 'http-status-codes';
import { userService } from '../services';
import { UserDto } from '../dtos/users';
import { validateNewUser } from '../validators/user.validator';

/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const createUser = async (req, res, next) => {
  try {
    const error = validateNewUser(req);
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

export const getUser = async (req, res, next) => {
  try {
    const { email, password } = req.query;

    const { user, authToken } = await userService.getUser({ email, password });
    res.set('Authorization', 'Bearer ' + authToken);

    res.status(HttpStatus.OK).json({
      data: new UserDto(user)
    });
  } catch (error) {
    next(error);
  }
};
