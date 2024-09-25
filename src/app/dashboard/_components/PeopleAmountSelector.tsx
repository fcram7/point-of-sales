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
import { people, table, time } from './ReservationInputArrays';
import { reservationStore } from '@/utils/zustand/reservation';

interface peopleAmountSelector {
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
  setValue: 'peopleAmount';
  field: ControllerRenderProps<
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
    'peopleAmount'
  >;
  inputLabel: string;
}

export const PeopleAmountSelector = ({
  form,
  setValue,
  field,
  inputLabel,
}: peopleAmountSelector) => {
  const { selectedTable } = reservationStore();
  let slicedPeopleArray;

  if (selectedTable === 6 || selectedTable === 7) {
    slicedPeopleArray = people.slice(0, 8);
  } else if (selectedTable === 5 || selectedTable === 8) {
    slicedPeopleArray = people.slice(0, 6);
  } else {
    slicedPeopleArray = people.slice(0, 4);
  }


  return (
    <FormItem className='w-[60%]'>
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
                ? people.find((people) => people.value === field.value)?.label
                : 'Select the amount of people'}
              <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-75' />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className='w-[200px] p-0 overflow-y-auto'>
          <Command>
            <CommandList>
              <CommandGroup>
                {/* {people.map((people) => ( */}
                {slicedPeopleArray &&
                  slicedPeopleArray.map((people) => (
                    <CommandItem
                      value={people.label}
                      key={people.value}
                      onSelect={() => {
                        form.setValue(setValue, people.value);
                        console.log('Selected value: ', people.value);
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          people.value === field.value
                            ? 'opacity-100'
                            : 'opacity-0'
                        )}
                      />
                      {people.label}
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
