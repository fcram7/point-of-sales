import { z } from 'zod';

export const itemsSchema = z.object({
  itemName: z.string({
    required_error: 'Item Name Required'
  }).min(6, {
    message: 'Item name has to be 6 character minimum'
  }),
  itemPrice: z.number({
    required_error: 'Item price required',
    invalid_type_error: 'Item price must be a number'
  }).positive(),
  itemCategory: z.enum([
    'drinks', 'foods', 'setMeals'
  ])
})