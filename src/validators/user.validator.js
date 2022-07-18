import Joi from '@hapi/joi';

export const validateNewUser = (req) => {
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
  return error;
};
