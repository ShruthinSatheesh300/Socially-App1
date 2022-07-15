import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';


/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const createUser = async (req, res, next) => {
  try {
    const newUser = await UserService.newUser(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: newUser,
      message: 'User created successfully'
    });
  } catch (error) {
    next(error);
  }
};

