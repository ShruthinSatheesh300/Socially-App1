import jwt from 'jsonwebtoken';

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const userAuth = async (req, res, next) => {
  try {
    const bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw {
        message: 'Authorization token is required'
      };
    const authToken = bearerToken.split(' ')[1];
    jwt.verify(authToken, process.env.SECRET_CODE, (error, verifiedToken) => {
      if (error) {
        throw {
          message: 'Token for Authorization is Incorrect'
        };
      }
      const { email, id } = verifiedToken;
      req.body['user'] = {
        email,
        userId: id
      };

      next();
    });
  } catch (error) {
    next(error);
  }
};
