'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
// import { InputComponent } from './Input';
import { InputComponent } from '@/components/Input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { orderSchema } from '@/utils/schema/OrderSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { orderStore } from '@/utils/zustand/order';
import { Button } from '@/components/ui/button';
import { OrderModalCard } from './OrderModalCard';
import { RadioGroup } from '@/components/ui/radio-group';
import { setOrderData } from '@/api/db';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { DialogClose, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RadioItem } from '@/components/RadioItem';

interface orderModal {
  cancelButtonHandler: () => void;
}

export const OrderModal = ({ cancelButtonHandler }: orderModal) => {
  const { setOrder, inQueue, order, total } = orderStore();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof orderSchema>>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      orderId: `ORDR${Date.now()}`,
      customerName: '',
      paymentType: 'Cash',
    },
  });

  const queueOrderHandler = async (values: z.infer<typeof orderSchema>) => {
    try {
      await setOrderData({
        orderId: values.orderId,
        customerName: values.customerName,
        order: order,
        total: total,
        payment: values.paymentType,
        queueOrder: inQueue,
      });

      toast({
        title: `Order with ${values.orderId} for ${values.customerName} is in queue`,
        action: (
          <ToastAction altText='Click to close notification'>Close</ToastAction>
        ),
      });

      location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <article className='order-modal w-full'>
      <div className='order-modal__content'>
        <DialogHeader>
          <DialogTitle className='xl:text-xl'>Input Order</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(queueOrderHandler)}
            className='space-y-6 w-full mt-4'
          >
            <div className='order-modal__order-information-container'>
              <div className='order-modal__order-detail grid gap-4'>
                <FormField
                  name='orderId'
                  control={form.control}
                  render={({ field }) => (
                    <InputComponent
                      inputLabel='Order ID'
                      inputPlaceholder=''
                      inputType='text'
                      field={field}
                      disabled={true}
                      required
                      onChangeHandler={(e) => field.onChange(e.target.value)}
                    />
                  )}
                />
                <FormField
                  name='customerName'
                  control={form.control}
                  render={({ field }) => (
                    <InputComponent
                      inputLabel='Customer Name'
                      inputPlaceholder='Customer name'
                      inputType='text'
                      field={field}
                      disabled={false}
                      required
                      onChangeHandler={(e) => field.onChange(e.target.value)}
                    />
                  )}
                />
                <div className='order-modal__card-container mt-4 p-2 border border-slate-400'>
                  {order.map((item, index) => (
                    <OrderModalCard
                      itemName={item.orderName}
                      itemPrice={item.itemPrice}
                      orderedItemAmount={item.orderAmount}
                      orderedTotal={item.orderTotal}
                      key={index}
                    />
                  ))}
                </div>

                <div className='order-modal__total-container mt-4 flex items-center justify-between xl:text-lg px-1'>
                  <p className='order-modal__total'>Total:</p>
                  <p className='order-modal__total-amount'>{total}</p>
                </div>
              </div>

              <div className='order-modal__order-payment'>
                <div className='order-modal__payment-button-container mt-2'>
                  <FormField
                    control={form.control}
                    name='paymentType'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment</FormLabel>
                        <FormControl>
                          <RadioGroup
                            defaultValue='Cash'
                            onValueChange={field.onChange}
                            {...field}
                          >
                            <RadioItem value='Cash' id='radioCash' label='Cash' htmlFor='r1' />
                            <RadioItem value='QRIS' id='radioQris' label='QRIS' htmlFor='r2' />
                            <RadioItem value='Debit' id='radioDebit' label='Debit' htmlFor='r3' />
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button type='submit'>Queue Order</Button>
              <DialogClose asChild>
                <Button
                  onClick={cancelButtonHandler}
                  variant='outline'
                  className='hover:border-primary'
                >
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </div>
    </article>
  );
};
