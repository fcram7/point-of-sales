'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { InputComponent } from './Input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { orderSchema } from '@/utils/schema/OrderSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { orderStore } from '@/utils/zustand/order';
import { Button } from '@/components/ui/button';
import { OrderModalCard } from './OrderModalCard';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { setOrderData } from '@/api/db';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

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
      setOrder({
        orderAmount: 0,
        orderName: '',
        orderTotal: 0,
        itemPrice: 0,
      });

      console.log(order);
      // location.reload();
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
                      disabled
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
                            <FormItem className='flex items-center space-x-2 space-y-0'>
                              <FormControl>
                                <RadioGroupItem value='Cash' id='radioCash' />
                              </FormControl>
                              <Label className='mt-0' htmlFor='r1'>
                                Cash
                              </Label>
                            </FormItem>
                            <FormItem className='flex items-center space-x-2 space-y-0'>
                              <FormControl>
                                <RadioGroupItem value='QRIS' id='radioQris' />
                              </FormControl>
                              <Label htmlFor='r2'>QRIS</Label>
                            </FormItem>
                            <FormItem className='flex items-center space-x-2 space-y-0'>
                              <FormControl>
                                <RadioGroupItem value='Debit' id='radioDebit' />
                              </FormControl>
                              <Label htmlFor='r3'>Debit</Label>
                            </FormItem>
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
