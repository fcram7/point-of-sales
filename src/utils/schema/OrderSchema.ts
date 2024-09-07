import { z } from 'zod';

export const orderSchema = z.object({
  orderId: z.string().min(6),
  customerName: z.string({
    required_error: 'Customer name required'
  }),
  paymentType: z.enum(['Cash', 'QRIS', 'Debit'], {
    required_error: 'Need to select at least 1'
  })
})