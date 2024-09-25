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
import { time } from './ReservationInputArrays';

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

export const TimeSelector = (
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
