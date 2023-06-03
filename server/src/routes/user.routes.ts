import e from 'express';
import { userController } from '../controllers/user.controller';
import { authMw } from '../middlewares/auth.middleware';

export const userRouter = e.Router();

userRouter.get('/me', authMw, userController.getProfile);

// module.exports = userRouter;
// export default userRouter;
