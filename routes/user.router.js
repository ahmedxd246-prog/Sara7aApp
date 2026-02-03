import express from 'express';
import authanticate from '../middlewares/authanticate.middleware.js';
import authorize from '../middlewares/authorization.middleware.js';
import { validate } from '../middlewares/schemaValidate.middleware.js';
import {
  updateProfile as profileSchema,
  changePassword as passwordSchema,
} from '../utils/modelValidations/user.validation.js';
import {
  updateProfile,
  changePassword,
  deactivateUser,
  blockUser,
  updateAvatar,
} from '../controllers/user.controller.js';
import upload from '../utils/multer.config.js';
import { typeValidation } from '../middlewares/typeValidation.middleware.js';
const router = express.Router();

//Update Profile
router.patch(
  '/updateProfile',
  authanticate,
  authorize('user'),
  validate(profileSchema),
  updateProfile,
);

//change password
router.patch(
  '/changePassword',
  authanticate,
  authorize('user'),
  validate(passwordSchema),
  changePassword,
);

//deacivate User
router.patch(
  '/deactivate',
  authanticate,
  authorize('user', 'admin'),
  deactivateUser,
);

//block user
router.patch('/block', authanticate, authorize('user'), blockUser);

//upload avatar
router.patch(
  'updateAvatar',
  authanticate,
  authorize('user'),
  upload.single('avatar'),
  updateAvatar,
);

export default router;
