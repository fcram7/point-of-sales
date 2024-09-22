'use client';

import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { allMenuInputProps, loginInputProps, orderInputProps, reservationInputProps } from '@/utils/interfaces/InputInterfaces';

export const InputComponent = ({
  field,
  inputLabel,
  inputPlaceholder,
  inputType,
  disabled,
  max,
  onChangeHandler
}: loginInputProps | orderInputProps | allMenuInputProps | reservationInputProps) => {
  return (
    <>
      <FormItem>
        <FormLabel>{inputLabel}</FormLabel>
        <FormControl>
          <Input placeholder={inputPlaceholder} max={inputType === 'number' ? max : 0} {...field} type={inputType} disabled={disabled} required onChange={onChangeHandler}/>
        </FormControl>
      </FormItem>
    </>
  );
};
