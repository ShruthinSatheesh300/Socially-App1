import Joi from '@hapi/joi';

export const validatePost = (payload) => {
  const schema = Joi.object({
    content: Joi.string().required().error(Error('Content is required'))
  });
  const { error } = schema.validate(payload);
  return error;
};
