import { z } from 'zod';

export const newUserSchema = z.object({
  fullName: z.string({
    required_error: 'Full name is required',
    invalid_type_error: 'Invalid type for full name'
  }).min(6, {
    message: 'Full name must be at least 6 characters'
  }),
  username: z.string({
    required_error: 'Username is required',
    invalid_type_error: 'Invalid type for username'
  }).min(8, {
    message: 'Username must be at least 8 characters'
  }),
  email: z.string({
    required_error: 'Email is required',
    invalid_type_error: 'Invalid type for email, please enter the correct format for email'
  }).email({
    message: 'Please enter your correct email'
  }),
  password: z.string({
    required_error: 'Password is required',
    invalid_type_error: 'Invalid type for password'
  }).min(8, {
    message: 'Password must be at least 8 characters'
  })
}).required();