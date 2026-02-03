import {
  generateAccessToken,
  verifyEmailToken,
} from '../utils/generate-token.util.js';
import catchAsync from '../utils/catch-async.util.js';
import User from '../models/user.model.js';
import AppError from '../utils/app-error.util.js';
import { emailEvent } from '../utils/EmailEvent.util.js';

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return next(new AppError('User not found', 404));
  const correctPassword = await user.correctPassword(password);
  if (!correctPassword) return next(new AppError('Incorrect password', 401));
  if (!user.confirmEmail)
    return next(new AppError('Please activate your account', 403));
  user.isActive = true;
  const token = generateAccessToken({ id: user._id, email, role: user.role });
  res.status(200).json({ token });
});

export const register = catchAsync(async (req, res, next) => {
  const { email, password, firstName, lastName, age, gender, phone } = req.body;

  const avatar = req.file ? `/uploads/userPhotos/${req.file.filename}` : null;

  const checkUser = await User.findOne({ email });
  if (checkUser) {
    return next(new AppError('User already exists', 400));
  }

  const user = await User.create({
    email,
    password,
    firstName,
    lastName,
    age,
    gender,
    phone,
    avatar,
  });

  const isSent = emailEvent.emit('sendEmail', user.email, user.firstName);
  if (!isSent) {
    return next(new AppError('Failed to send activation email', 500));
  }

  res.status(201).json({
    success: true,
    message: 'Activation email sent successfully',
  });
});

export const activateAccount = catchAsync(async (req, res, next) => {
  const { token } = req.params;

  let decoded;
  try {
    decoded = verifyEmailToken(token);
  } catch (err) {
    return next(new AppError('Activation link expired or invalid', 400));
  }

  const user = await User.findOne({ email: decoded.email });

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  if (user.confirmEmail) {
    return res.status(200).json({
      success: true,
      message: 'Account already activated',
    });
  }

  user.confirmEmail = true;
  user.emailVerifiedAt = new Date();
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Account activated successfully 🎉',
  });
});
