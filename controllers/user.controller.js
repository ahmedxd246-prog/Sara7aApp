import User from '../models/user.model.js';
import Message from '../models/message.model.js';
import AppError from '../utils/app-error.util.js';
import catchAsync from '../utils/catch-async.util.js';

export const updateProfile = catchAsync(async (req, res, next) => {
  const profile = await User.findByIdAndUpdate(
    req.user.id,
    { ...req.body },
    { new: true, runValidators: true },
  );
  if (!profile) return next(new AppError('can\;t find this profile', 404));
  return res
    .status(200)
    .json({ success: true, message: 'profile updated✅', profile });
});

export const changePassword = catchAsync(async (req, res, next) => {
  const { password, newPassword } = req.body.password;
  if (!password || !newPassword)
    return next(new AppError('missing new Password', 404));
  const correctPassword = await User.correctPassword(password);
  if (!correctPassword) return next(new AppError('invalid Password', 400));

  await User.findByIdAndUpdate(
    req.user.id,
    { password: newPassword, changedAt: Date.now() },
    {
      new: true,
      runValidators: true,
    },
  );
  res.status(200).json({ success: true, message: 'password updated' });
});

export const blockUser = catchAsync(async (req, res, next) => {
  const messages = await Message.findOne({ sender: req.user.id });
  const receiverID = messages.receiver;
  await User.findByIdAndUpdate(
    receiverID,
    {
      isBlocked: true,
    },
    { new: true, runValidators: true },
  );
  return res
    .satatus(200)
    .json({ success: true, message: 'user blocked successfully' });
});

export const deactivateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { isActive: false },
    { new: true, runValidators: true },
  );
  user.changedAt = Date.now();
  return res.status(200).json({ success: true, message: 'user deactivated' });
});

export const updateAvatar = catchAsync(async (req, res, next) => {
  const newAvatar = req.file
    ? `/uploads/userAvatar/${req.file.filename}`
    : null;
  if (!newAvatar) return next(new AppError('avatar not found', 404));
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { avatar: newAvatar },
    { new: true, runValidators: true },
  );
  return res.status(200).json({ success: true, message: 'avatar uploaded' });
});
