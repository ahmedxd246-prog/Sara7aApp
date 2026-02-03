import express from 'express';
import {
  register,
  login,
  activateAccount,
} from '../controllers/auth.controller.js';
import { validate } from '../middlewares/schemaValidate.middleware.js';
import {
  register as registerSchema,
  login as loginSchema,
  activateAccount as accountSchema,
} from '../utils/modelValidations/user.validation.js';
import upload from '../utils/multer.config.js';

const router = express.Router();

router.post(
  '/register',
  upload.single('avatar'),
  validate(registerSchema),
  register,
);
router.post('/login', validate(loginSchema), login);
router.get('/activate/:token', validate(accountSchema), activateAccount);

export default router;
