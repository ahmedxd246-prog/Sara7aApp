import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import AppError from '../utils/app-error.util.js';
import catchAsync from '../utils/catch-async.util.js';

const authenticate = catchAsync(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return next(new AppError('No access token provided', 401));

  const token = authHeader.split(' ')[1];
  if (!token || !authHeader.startsWith('Bearer')) {
    return next(new AppError('Invalid authorization header', 401));
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_USER);
  } catch (err) {
    return next(new AppError('Invalid or expired token', 401));
  }

  const user = await User.findById(decoded.id);
  if (!user) return next(new AppError('User not found', 401));
  if (user.changedAt?.getTime() > decoded.iat * 1000)
    return next(new AppError('you must login again', 401));

  req.user = user;
  next();
});

export default authenticate;
