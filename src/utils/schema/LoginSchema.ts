import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z.string({
    required_error: 'Email required',
    invalid_type_error: 'Invalid type'
  }).email({
    message: 'Please enter your correct email'
  }),
  password: z.string({
    required_error: 'Password required',
    invalid_type_error: 'Invalid type'
  }).min(8, {
    message: 'Password must be at least 8 characters'
  }),
}).required();