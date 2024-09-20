import { z } from 'zod';

const time = [
  '08.00',
  '09.00',
  '10.00',
  '11.00',
  '12.00',
  '13.00',
  '14.00',
  '15.00',
  '16.00',
  '17.00',
  '18.00',
  '19.00',
  '20.00',
  '21.00',
  '22.00',
] as const;

export const reservationSchema = z.object({
  reservationId: z.string({
    required_error: 'Reservation ID required'
  }),
  contactPerson: z.string({
    required_error: 'Reservation Contact person required',
    invalid_type_error: 'Invalid data type for reservation contact person data'
  }).min(2, {
    message: 'Contact person data has to be at least 2 characters'
  }),
  contactNumber: z.string({
    required_error: 'Reservation Contact number required',
    invalid_type_error: 'Invalid data type for reservation contact number data'
  }).min(10, {
    message: 'Contact number data has to be at least 10 characters'
  }),
  selectedTable: z.coerce.number({
    required_error: 'Reservation Selected table required',
    invalid_type_error: 'Invalid data type for reservation selected table data'
  }).int().positive().nullable(),
  peopleAmount: z.coerce.number({
    required_error: 'Reservation People amount required',
    invalid_type_error: 'Invalid data type for reservation people amount data'
  }).int().positive().nullable(),
  reservationSchedule: z.date({
    required_error: 'Reservation Booking schedule required',
    invalid_type_error: 'Invalid data type for reservation booking schedule data'
  }),
  reservationStarts: z.string({
    required_error: 'Reservation time start required',
    invalid_type_error: 'Invalid data type for reservation time start data'
  }),
  reservationEnds: z.string({
    required_error: 'Reservation time end required',
    invalid_type_error: 'Invalid data type for reservation time end data'
  }),
  // reservationStarts: z.enum(time).array().min(1).safeParse([]).success
  // attendedStatus: z.boolean({
  //   required_error: 'Reservation attended status required',
  //   invalid_type_error: 'Invalid data type for reservation attended status'
  // })
}).required();