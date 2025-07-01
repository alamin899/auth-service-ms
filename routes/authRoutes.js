import express from 'express';
import { login } from '../controllers/authController.js';
import { register } from '../controllers/registrationController.js';
import { verifyTokenController } from '../controllers/verifyTokenController.js';
import { loginValidator } from '../validators/authValidator.js';
import { registerValidator } from '../validators/registrationValidator.js';
import { validateMiddleware } from '../middlewares/validate.js';
import {checkAuthorizationHeader} from "../middlewares/checkAuthorizationHeader.js";

const router = express.Router();

router.post('/login',loginValidator,validateMiddleware, login);
router.post('/register',registerValidator,validateMiddleware, register);
router.get('/verify-token',checkAuthorizationHeader,validateMiddleware, verifyTokenController);

export default router;
