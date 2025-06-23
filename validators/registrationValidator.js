import { body } from 'express-validator';

export const registerValidator = [
    body('email')
        .isEmail()
        .withMessage('Invalid email format')
        .normalizeEmail(),

    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters')
        .matches(/[a-z]/)
        .withMessage('Must include a lowercase letter')
        .matches(/[A-Z]/)
        .withMessage('Must include an uppercase letter')
        .matches(/[0-9]/)
        .withMessage('Must include a number')
        .matches(/[\W]/)
        .withMessage('Must include a special character'),
];
