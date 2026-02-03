import express from 'express';
import {
  createMessage,
  getMessageBetweenUsers,
  getSingleMessage,
  deleteAllMessages,
  deleteMessage,
  modifyMessage,
} from '../controllers/message.controller.js';
import authenticate from '../middlewares/authanticate.middleware.js';
import authorize from '../middlewares/authorization.middleware.js';
import { validate } from '../middlewares/schemaValidate.middleware.js';
import {
  getAllMessages,
  sendMessage,
} from '../utils/modelValidations/message.validation.js';
const router = express.Router();

//Send Mesaage
router.post(
  '/createMessage/:receiver',
  authenticate,
  authorize('user'),
  validate(sendMessage),
  createMessage,
);

//Modify Message
router.patch(
  '/modifyMessage/:messageID',
  authenticate,
  authorize('user'),
  modifyMessage,
);

//Get All Messages between two Users
router.get(
  '/getMessages/:receiver',
  authenticate,
  authorize('user'),
  validate(getAllMessages),
  getMessageBetweenUsers,
);

//Get Single Message
router.get(
  '/searchMessage/:messageID',
  authenticate,
  authorize('user'),
  getSingleMessage,
);

//Delete Message
router.delete(
  '/deleteMessage/:messageID',
  authenticate,
  authorize('user'),
  deleteMessage,
);

//Delete Chat
router.delete(
  '/deleteChat/:receiver',
  authenticate,
  authorize('user'),
  deleteAllMessages,
);


export default router;
