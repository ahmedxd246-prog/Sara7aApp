import User from '../models/user.model.js';
import Message from '../models/message.model.js';
import AppError from '../utils/app-error.util.js';
import catchAsync from '../utils/catch-async.util.js';
import mongoose from 'mongoose';

//Send Message
export const createMessage = catchAsync(async (req, res, next) => {
  const sender = req.user.id;
  const { receiver } = req.params;
  const { message } = req.body;
  if (!message) {
    return next(new AppError('message is required', 400));
  }
  const senderUser = await User.findById(sender);
  if (!senderUser) return next(new AppError('sender not found', 404));
  const receiverUser = await User.findOne({
    _id: receiver,
    isBlocked: false,
  });
  if (!receiverUser) return next(new AppError('receiver not found', 404));
  await Message.create({
    sender,
    receiver,
    message,
  });

  return res.status(201).json({
    success: true,
    message: 'message sent successfully🎉',
  });
});

//Get Chat
export const getMessageBetweenUsers = catchAsync(async (req, res, next) => {
  const senderId = new mongoose.Types.ObjectId(req.user.id);
  const receiverId = new mongoose.Types.ObjectId(req.params.receiver);

  const messages = await Message.find({
    $or: [
      { sender: senderId, receiver: receiverId },
      { sender: receiverId, receiver: senderId },
    ],
  })
    .sort({ createdAt: -1 })
    .populate([
      { path: 'sender', select: 'firstName lastName photo' },
      { path: 'receiver', select: 'firstName lastName photo' },
    ]);

  return res.status(200).json({
    success: true,
    messages,
  });
});

//search a message
export const getSingleMessage = catchAsync(async (req, res, next) => {
  const { messageID } = req.params;
  const message = await Message.findById(messageID).populate([
    { path: 'sender', select: 'name email ' },
    { path: 'receiver', select: 'name email' },
  ]);
  if (!message) return next(new AppError('message not found', 404));
  if (
    req.user.id == message.sender._id.toString() ||
    req.user.id == message.receiver._id.toString()
  ) {
    return res.status(200).json({ success: true, message });
  }
  return next(new AppError("can't find this message", 403));
});

//Delete Message
export const deleteMessage = catchAsync(async (req, res, next) => {
  const { messageID } = req.params;
  const message = await Message.findByIdAndDelete(messageID);
  if (!message) return next(new AppError('message not found', 404));
  return res
    .status(200)
    .json({ success: true, message: 'message deleted successfully' });
});

//Delete Chat
export const deleteAllMessages = catchAsync(async (req, res, next) => {
  const { receiver } = req.params;
  const chat = await Message.deleteMany({
    $or: [
      { sender: req.user.id, receiver },
      { sender: receiver, receiver: req.user.id },
    ],
  });
  return res
    .status(200)
    .json({ success: true, message: 'messages deleted successfully' });
});

//Modify Message
export const modifyMessage = catchAsync(async (req, res, next) => {
  const { messageID } = req.params;
  const { newMessage } = req.body;
  const message = await Message.findByIdAndUpdate(
    messageID,
    { message: newMessage },
    { new: true, runValidators: true },
  );
  if (!message) return next(new AppError('message not found', 404));
  return res
    .status(200)
    .json({ success: true, message: 'message modified successfully' });
});
