'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { itemsSchema } from '@/utils/schema/ItemsSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { InputComponent } from './Input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface editMenuCardForm {
  handleSubmit: (values: z.infer<typeof itemsSchema>) => void;
  itemName: string;
  itemPrice: number;
}

export const EditMenuCardForm = ({ handleSubmit, itemName, itemPrice }: editMenuCardForm) => {
  const form = useForm<z.infer<typeof itemsSchema>>({
    resolver: zodResolver(itemsSchema),
    defaultValues: {
      itemName: itemName,
      itemPrice: itemPrice,
      itemCategory: 'drinks',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='w-full space-y-10 flex flex-col items-center'>
        <div className="edit-menu-card-form__content w-[50%] grid gap-6">
          <FormField
            name='itemName'
            control={form.control}
            render={({ field }) => (
              <InputComponent
                field={field}
                inputLabel='Menu Name'
                inputPlaceholder='Put the new menu name'
                inputType='text'
                disabled={false}
                onChangeHandler={(e) => field.onChange(e.target.value)}
              />
            )}
          />
          <FormField
            name='itemPrice'
            control={form.control}
            render={({ field }) => (
              <InputComponent
                field={field}
                inputLabel='Menu Price'
                inputPlaceholder='Put the new menu price'
                inputType='number'
                disabled={false}
                onChangeHandler={(e) => field.onChange(e.target.valueAsNumber)}
              />
            )}
          />
          <FormField
            name='itemCategory'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className='xl:text-xl'>Item Category</FormLabel>
                <FormControl>
                  <RadioGroup
                    defaultValue='drinks'
                    {...field}
                    onValueChange={field.onChange}
                  >
                    <FormItem className='flex items-center space-x-2 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='drinks' id='radioDrinks' />
                      </FormControl>
                      <Label className='mt-0 xl:text-xl' htmlFor='radioDrinks'>Drinks</Label>
                    </FormItem>
                    <FormItem className='flex items-center space-x-2 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='foods' id='radioFoods' />
                      </FormControl>
                      <Label className='mt-0 xl:text-xl' htmlFor='radioFoods'>Foods</Label>
                    </FormItem>
                    <FormItem className='flex items-center space-x-2 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='setMeals' id='radioSetMeals' />
                      </FormControl>
                      <Label className='mt-0 xl:text-xl' htmlFor='radioSetMeals'>Set Meals</Label>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button type='submit'>Finish Menu Edit</Button>
      </form>
    </Form>
  );
};
