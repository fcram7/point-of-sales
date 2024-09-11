'use client';

import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ChangeEventHandler, HTMLInputTypeAttribute } from 'react';
import { ControllerRenderProps } from 'react-hook-form';

interface inputProps {
  field: ControllerRenderProps<
    {
      itemName: string;
      itemPrice: number;
      itemCategory: 'drinks' | 'foods' | 'setMeals';
    },
    'itemName' | 'itemPrice' | 'itemCategory'
  >;
  inputLabel: string;
  inputPlaceholder: string;
  inputType: HTMLInputTypeAttribute;
  disabled: boolean;
  onChangeHandler?: ChangeEventHandler<HTMLInputElement> | undefined;
}

export const InputComponent = ({
  field,
  inputLabel,
  inputPlaceholder,
  inputType,
  disabled,
  onChangeHandler,
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
            onChange={onChangeHandler}
          />
        </FormControl>
      </FormItem>
    </>
  );
};
