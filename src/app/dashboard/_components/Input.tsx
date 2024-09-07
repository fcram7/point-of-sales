'use client';

import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { HTMLInputTypeAttribute } from 'react';
import { ControllerRenderProps } from 'react-hook-form';

interface inputProps {
  field: ControllerRenderProps<
    {
      orderId: string;
      customerName: string;
      paymentType: 'Cash' | 'QRIS' | 'Debit';
    },
    'orderId' | 'customerName' | 'paymentType'
  >;
  inputLabel: string;
  inputPlaceholder: string;
  inputType: HTMLInputTypeAttribute;
  disabled: boolean;
}

export const InputComponent = ({
  field,
  inputLabel,
  inputPlaceholder,
  inputType,
  disabled,
}: inputProps) => {
  return (
    <>
      <FormItem>
        <FormLabel className='xl:text-xl'>{inputLabel}</FormLabel>
        <FormControl>
          <Input
            placeholder={inputPlaceholder}
            {...field}
            type={inputType}
            disabled={disabled}
          />
        </FormControl>
      </FormItem>
    </>
  );
};
