'use client';

import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { HTMLInputTypeAttribute } from 'react';
import { ControllerRenderProps } from 'react-hook-form';

interface inputProps {
  field: ControllerRenderProps<
    { email: string; password: string },
    'email' | 'password'
  >;
  inputLabel: string;
  inputPlaceholder: string;
  inputType: HTMLInputTypeAttribute;
}

export const InputComponent = ({
  field,
  inputLabel,
  inputPlaceholder,
  inputType,
}: inputProps) => {
  return (
    <>
      <FormItem>
        <FormLabel>{inputLabel}</FormLabel>
        <FormControl>
          <Input placeholder={inputPlaceholder} {...field} type={inputType} />
        </FormControl>
      </FormItem>
    </>
  );
};
