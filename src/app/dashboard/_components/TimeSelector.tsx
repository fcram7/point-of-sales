import { Button } from '@/components/ui/button';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { reservationInputProps } from '@/utils/interfaces/InputInterfaces';
import { reservationSchema } from '@/utils/schema/ReservationSchema';
import { Check, ChevronsUpDown } from 'lucide-react';
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

interface timeSelector {
  form: UseFormReturn<
    {
      reservationId: string;
      contactPerson: string;
      contactNumber: string;
      selectedTable: number | null;
      peopleAmount: number | null;
      reservationSchedule: Date;
      reservationStarts: string;
      reservationEnds: string;
    },
    any,
    undefined
  >;
  setValue: 'reservationStarts' | 'reservationEnds';
  field: ControllerRenderProps<{
    reservationId: string;
    contactPerson: string;
    contactNumber: string;
    selectedTable: number | null;
    peopleAmount: number | null;
    reservationSchedule: Date;
    reservationStarts: string;
    reservationEnds: string;
  }, 'reservationStarts' | 'reservationEnds'>;
  inputLabel: string;
}

const time = [
  {
    label: '08.00',
    value: '08.00',
  },
  {
    label: '09.00',
    value: '09.00',
  },
  {
    label: '10.00',
    value: '10.00',
  },
  {
    label: '11.00',
    value: '11.00',
  },
  {
    label: '12.00',
    value: '12.00',
  },
  {
    label: '13.00',
    value: '13.00',
  },
  {
    label: '14.00',
    value: '14.00',
  },
  {
    label: '15.00',
    value: '15.00',
  },
  {
    label: '16.00',
    value: '16.00',
  },
  {
    label: '17.00',
    value: '17.00',
  },
  {
    label: '18.00',
    value: '18.00',
  },
  {
    label: '19.00',
    value: '19.00',
  },
  {
    label: '20.00',
    value: '20.00',
  },
  {
    label: '21.00',
    value: '21.00',
  },
  {
    label: '22.00',
    value: '22.00',
  },
];

export const TimeSelector = (
  // { field, inputLabel }: reservationInputProps,
  { form, setValue, field, inputLabel }: timeSelector
) => {
  return (
    <FormItem>
      <Popover>
        <FormLabel>{inputLabel}</FormLabel>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              role='combobox'
              variant={'outline'}
              className={cn(
                'w-[200px] justify-between',
                !field.value && 'text-muted-foreground'
              )}
            >
              {field.value
                ? time.find((time) => time.value === field.value)?.label
                : 'Select time'}
              <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-75' />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className='w-[200px] p-0 overflow-y-auto'>
          <Command>
            <CommandList>
              <CommandGroup>
                {time.map((time) => (
                  <CommandItem
                    value={time.label}
                    key={time.value}
                    onSelect={() => {
                      form.setValue(setValue, time.value)
                      console.log('Selected value: ', time.value)
                    }}
                  >
                    <Check 
                      className={cn(
                        'mr-2 h-4 w-4',
                        time.value === field.value ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    {time.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

    </FormItem>
  );
};
