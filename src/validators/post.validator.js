import Joi from '@hapi/joi';

export const validatePost = (req) => {
  const schema = Joi.object({
    content: Joi.string().required().error(Error('Content is required'))
  });
  const { error } = schema.validate(req.body);
  return error;
};
