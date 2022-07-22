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
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw {
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];
    jwt.verify(bearerToken, process.env.SECRET_CODE, (verifiedToken) => {
      if (!verifiedToken) {
        throw {
          message: 'Token for Authorization is Incorrect'
        };
      } 
        req.body['userId'] = verifiedToken.id;

        next();
      
    });
  } catch (error) {
    next(error);
  }
};

//     const { user } = await jwt.verify(bearerToken, 'SECRET_CODE');
//     res.locals.user = user;
//     res.locals.token = bearerToken;
//     next();
//   } catch (error) {
//     next(error);
//   }
// };
