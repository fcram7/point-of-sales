import { ChangeEventHandler, HTMLInputTypeAttribute } from 'react';
import { ControllerRenderProps } from 'react-hook-form';


//Login input props
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

//order input props
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

//all menu input props
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

//reservation input props
export interface reservationInputProps {
  field: ControllerRenderProps<
    {
      reservationId: string;
      contactPerson: string;
      contactNumber: string;
      selectedTable: number | null;
      peopleAmount: number | null;
      reservationSchedule: any;
      // reservationSchedule: string;
      // reservationTime: reservationTime[];
      reservationStarts: string;
      reservationEnds: string;
      // attendedStatus: boolean;
    },
    'reservationId' | 'contactPerson' | 'contactNumber' | 'selectedTable' | 'peopleAmount' | 'reservationSchedule' | 'reservationStarts' | 'reservationEnds'
  >
  inputLabel: string;
  inputPlaceholder: string;
  inputType: HTMLInputTypeAttribute;
  disabled: boolean;
  required: boolean;
  onChangeHandler?: ChangeEventHandler<HTMLInputElement> | undefined;
}