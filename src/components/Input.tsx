'use client';

import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  allMenuInputProps,
  loginInputProps,
  newUserInputProps,
  orderInputProps,
  reservationInputProps,
} from '@/utils/interfaces/InputInterfaces';

export const InputComponent = ({
  field,
  inputLabel,
  inputPlaceholder,
  inputType,
  disabled,
  onChangeHandler,
}:
  | loginInputProps
  | newUserInputProps
  | orderInputProps
  | allMenuInputProps
  | reservationInputProps) => {
  return (
    <>
      <FormItem>
        <FormLabel>{inputLabel}</FormLabel>
        <FormControl>
          <Input
            placeholder={inputPlaceholder}
            {...field}
            type={inputType}
            disabled={disabled}
            required
            onChange={onChangeHandler}
          />
        </FormControl>
      </FormItem>
    </>
  );
};
