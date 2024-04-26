'use client';

import { z } from 'zod';

const passwordRegex = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,40}$/,
);
/*
At least one lowercase letter
At least one uppercase letter
At least one digit
At least one special character from @$!%*?&
The overall length of the password should be between 6 and 40 characters.
*/

export const signUpSchema = z
  .object({
    email: z.string().email('Enter valid email').min(5).max(50),
    password: z
      .string()
      .min(6)
      .max(40)
      .regex(
        passwordRegex,
        'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character from @$!%*?&#, and should be between 6 and 40 characters',
      ),
    confirmPassword: z.string(),
  })
  .required()
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;

export const signInSchema = z
  .object({
    email: z.string().email('Enter valid email').min(5).max(50),
    password: z.string().min(6).max(40),
  })
  .required();

export type SignInSchema = z.infer<typeof signInSchema>;
