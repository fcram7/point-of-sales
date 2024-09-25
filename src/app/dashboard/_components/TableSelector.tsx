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
import { table, time } from './ReservationInputArrays';
import { reservationStore } from '@/utils/zustand/reservation';

interface tableSelector {
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
  setValue: 'selectedTable';
  field: ControllerRenderProps<{
    reservationId: string;
    contactPerson: string;
    contactNumber: string;
    selectedTable: number | null;
    peopleAmount: number | null;
    reservationSchedule: Date;
    reservationStarts: string;
    reservationEnds: string;
  }, 'selectedTable'>;
  inputLabel: string;
}

export const TableSelector = (
  { form, setValue, field, inputLabel }: tableSelector
) => {
  const { selectedTable, setSelectedTable } = reservationStore();
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
                ? table.find((table) => table.value === field.value)?.label
                : 'Select table'}
              <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-75' />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className='w-[200px] p-0 overflow-y-auto'>
          <Command>
            <CommandList>
              <CommandGroup>
                {table.map((table) => (
                  <CommandItem
                    value={table.label}
                    key={table.value}
                    onSelect={() => {
                      form.setValue(setValue, table.value)
                      setSelectedTable(table.value);
                      console.log('Selected value: ', table.value, selectedTable)
                    }}
                  >
                    <Check 
                      className={cn(
                        'mr-2 h-4 w-4',
                        table.value === field.value ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    {table.label}
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
