import { z } from 'zod';

export const orderSchema = z.object({
  orderId: z.string({
    required_error: 'Order ID required'
  }).min(6),
  customerName: z.string({
    required_error: 'Customer name required',
    invalid_type_error: 'Invalid type'
  }),
  paymentType: z.enum(['Cash', 'QRIS', 'Debit'], {
    required_error: 'Need to select at least 1'
  })
}).required();