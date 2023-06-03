import { body } from 'express-validator';

export class AuthValidation {
  register = [
    body('email').isEmail().normalizeEmail(),
    body('username').notEmpty(),
    body('password').isLength({ min: 8, max: 32 }),
    body('name').notEmpty(),
  ];

  login = [body('userSession').notEmpty(), body('password').notEmpty()];
}

export const authValidation = new AuthValidation();
