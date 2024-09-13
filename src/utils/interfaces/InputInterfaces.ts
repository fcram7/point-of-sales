import { ChangeEventHandler, HTMLInputTypeAttribute } from 'react';
import { ControllerRenderProps } from 'react-hook-form';

// export interface inputProps {
//   field?: ControllerRenderProps<
//     {
//       email: string;
//       password: string;

//       orderId?: string;
//       customerName?: string;
//       paymentType?: 'Cash' | 'QRIS' | 'Debit';

//       itemName?: string;
//       itemPrice?: number;
//       itemCategory?: 'drinks' | 'foods' | 'setMeals';
//     },
//     'email' | 'password' | 'orderId' | 'customerName' | 'paymentType' | 'itemName' | 'itemPrice' | 'itemCategory'
//   >;

//   loginField?: ControllerRenderProps<
//     {
//       email: string;
//       password: string;
//     },
//     'email' | 'password'
//   >

//   orderField?: ControllerRenderProps<
//     {
//       orderId: string;
//       customerName: string;
//       paymentType: 'Cash' | 'QRIS' | 'Debit';
//     },
//     'orderId' | 'customerName' | 'paymentType'
//   >;

//   allMenuField?: ControllerRenderProps<
//     {
//       itemName: string;
//       itemPrice: number;
//       itemCategory: 'drinks' | 'foods' | 'setMeals';
//     },
//     'itemName' | 'itemPrice' | 'itemCategory'
//   >
//   inputLabel: string;
//   inputPlaceholder: string;
//   inputType: HTMLInputTypeAttribute;
//   disabled: boolean;
//   required: boolean;
// }

export interface loginInputProps {
  field: ControllerRenderProps<
    {
      email: string;
      password: string;
    },
    'email' | 'password'
  >;
  inputLabel: string;
  inputPlaceholder: string;
  inputType: HTMLInputTypeAttribute;
  disabled: boolean;
  required: boolean;
  onChangeHandler?: ChangeEventHandler<HTMLInputElement> | undefined;
}

export interface orderInputProps {
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
  required: boolean;
  onChangeHandler?: ChangeEventHandler<HTMLInputElement> | undefined;
}

export interface allMenuInputProps {
  field: ControllerRenderProps<
    {
      itemName: string;
      itemPrice: number;
      itemCategory: 'drinks' | 'foods' | 'setMeals';
    },
    'itemName' | 'itemPrice' | 'itemCategory'
  >
  inputLabel: string;
  inputPlaceholder: string;
  inputType: HTMLInputTypeAttribute;
  disabled: boolean;
  required: boolean;
  onChangeHandler?: ChangeEventHandler<HTMLInputElement> | undefined;
}