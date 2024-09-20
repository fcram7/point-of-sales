'use client';

import { InputComponent } from '@/components/Input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { reservationSchema } from '@/utils/schema/ReservationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { TimeSelector } from './TimeSelector';

interface reservationInput {
  handleSubmit: (values: z.infer<typeof reservationSchema>) => void;
}

export const ReservationInput = ({ handleSubmit }: reservationInput) => {
  const form = useForm<z.infer<typeof reservationSchema>>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      reservationId: `RSV${Date.now()}`,
      contactPerson: '',
      contactNumber: '',
      selectedTable: null,
      peopleAmount: null,
      reservationSchedule: new Date(),
      reservationStarts: '08.00',
      reservationEnds: '08.00',
      // attendedStatus: false
    },
  });

  return (
    <div className='reservation-input w-full'>
      <DrawerHeader>
        <div className='reservation-input__header flex flex-col items-center'>
          <DrawerTitle className='xl:text-3xl'>Add New Reservation</DrawerTitle>
          <DrawerDescription className='xl:text-lg'>
            Input a new reservation data
          </DrawerDescription>
        </div>
      </DrawerHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className='space-y-6 w-full mt-4 flex flex-col items-center'
        >
          <div className='reservation-input__input-container grid grid-cols-2 gap-4 w-[50%]'>
            <FormField
              name='reservationId'
              control={form.control}
              render={({ field }) => (
                <InputComponent
                  inputLabel='Reservation ID'
                  inputPlaceholder=''
                  inputType='text'
                  field={field}
                  disabled={true}
                  required
                  onChangeHandler={(e) => field.onChange(e.target.value)}
                />
              )}
            />
            <FormField
              name='contactPerson'
              control={form.control}
              render={({ field }) => (
                <InputComponent
                  inputLabel='Contact Person'
                  inputPlaceholder='Insert the contact person name'
                  inputType='text'
                  field={field}
                  disabled={false}
                  required
                  onChangeHandler={(e) => field.onChange(e.target.value)}
                />
              )}
            />
            <FormField
              name='contactNumber'
              control={form.control}
              render={({ field }) => (
                <InputComponent
                  inputLabel='Contact Number'
                  inputPlaceholder='Insert the contact number'
                  inputType='text'
                  field={field}
                  disabled={false}
                  required
                  onChangeHandler={(e) => field.onChange(e.target.value)}
                />
              )}
            />
            <FormField
              name='selectedTable'
              control={form.control}
              render={({ field }) => (
                <InputComponent
                  inputLabel='Selected Table'
                  inputPlaceholder='Insert the table for reservation'
                  inputType='number'
                  field={field}
                  disabled={false}
                  required
                  onChangeHandler={(e) => {
                    if (e.target.value === '') return field.onChange(undefined);
                    field.onChange(e.target.valueAsNumber);
                  }}
                />
              )}
            />
            <FormField
              name='peopleAmount'
              control={form.control}
              render={({ field }) => (
                <InputComponent
                  inputLabel='Amount of People'
                  inputPlaceholder='Insert the amount of people for the reservation'
                  inputType='number'
                  field={field}
                  disabled={false}
                  required
                  onChangeHandler={(e) => {
                    if (e.target.value === '') return field.onChange(undefined);
                    field.onChange(e.target.valueAsNumber);
                  }}
                />
              )}
            />
            <FormField
              name='reservationSchedule'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reservation Schedule</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-full pl-3 text-left font-normal hover:border-primary',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <div className='reservation-input__time-inputs flex items-center-justify-between gap-4'>
              <FormField
                name='reservationStarts'
                control={form.control}
                render={({ field }) => (
                  <TimeSelector field={field} inputLabel='Reservation From' form={form} setValue='reservationStarts' />
                )}
              />
              <FormField
                name='reservationEnds'
                control={form.control}
                render={({ field }) => (
                  <TimeSelector field={field} inputLabel='Reservation Until' form={form} setValue='reservationEnds' />
                )}
              />
            </div>
          </div>

          <Button type='submit'>Save reservation</Button>
        </form>
      </Form>
    </div>
  );
};
