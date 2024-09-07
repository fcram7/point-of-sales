import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z.string({
    required_error: 'Email required'
  }).email({
    message: 'Please enter your correct email'
  }),
  password: z.string({
    required_error: 'Password required'
  }).min(8, {
    message: 'Password must be at least 8 characters'
  }),
});