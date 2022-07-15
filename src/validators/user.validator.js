import Joi from '@hapi/joi';
import HttpStatus from 'http-status-codes';

export const newUserValidator = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().min(4).required().error(Error('Enter a appropriate first name')),
    lastName: Joi.string().min(4).required().error(Error('Enter a appropriate last name')),
    email: Joi.string().email().required().error(Error('Enter a appropriate Email')),
    password: Joi.string().min(6).required()
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `Enter valid deatils : ${error}`
    })
  } else {

    next();
  }
};
