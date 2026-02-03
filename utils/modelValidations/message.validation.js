import joi from 'joi';
import { Types } from 'mongoose';

export const customValidate = (value, helper) => {
  if (Types.ObjectId.isValid(value)) return value;
  return helper.message('Receiver must be a valid ObjectId');
};

export const sendMessage = joi.object({
  message: joi.string().trim().required(),
  receiver: joi.custom(customValidate).required(),
});



export const getAllMessages = joi.object({
  receiver: joi.custom(customValidate).required(),
});
