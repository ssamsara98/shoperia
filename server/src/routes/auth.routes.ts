import e from 'express';
import { authController } from '../controllers/auth.controller';
import { authValidation } from '../validations/auth.validation';
import { validationMw } from '../middlewares/validation.middleware';

export const authRouter = e.Router();

authRouter.post('/register', authValidation.register, validationMw, authController.register);
authRouter.post('/login', authValidation.login, validationMw, authController.login);
authRouter.post('/logout', authController.logout);

// module.exports = authRouter;
// export default authRouter;
