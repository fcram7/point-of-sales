'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import { rupiah } from '@/utils/priceConverter/priceConverter';
import { orderStore } from '@/utils/zustand/order';
import { useEffect, useState } from 'react';

interface item {
  itemName: string;
  itemPrice: number;
}

export const MenuCard = ({ itemName, itemPrice }: item) => {
  const [itemAmount, setItemAmount] = useState(0);
  const { setOrder } = orderStore();
  const { toast } = useToast();

  const addItemHandler = () => {
    setItemAmount((prevItem) => (prevItem += 1));
  };

  const removeItemHandler = () => {
    setItemAmount((prevItem) => Math.max((prevItem -= 1), 0));
  };

  const addOrderHandler = () => {
    if (itemAmount > 0) {
      setOrder({
        orderName: itemName,
        itemPrice: itemPrice,
        orderAmount: itemAmount,
        orderTotal: itemAmount * itemPrice,
      });
    }

    toast({
      title: 'Added item to order',
      description: `Item: ${itemName}, Amount: ${itemAmount}`,
      action: (
        <ToastAction altText='Click to close notification'>Close</ToastAction>
      ),
    });

    setItemAmount(0);
  };

  return (
    <article className='menu-card rounded-lg border-2 border-slate-300 w-full shadow-xl'>
      <div className='menu-card__content p-6'>
        <div className='menu-card__menu-img flex items-center justify-center h-44'>
          IMG PLACEHOLDER
        </div>
        <h1 className='menu-card__menu-name'>{itemName}</h1>
        <p className='menu-card__menu-price'>{rupiah(itemPrice)}</p>
        <div className='menu-card__order-inputs flex gap-2 mt-4 items-center justify-center'>
          <Button onClick={removeItemHandler}>-</Button>
          <Input
            type='number'
            value={itemAmount}
            onChange={(e) => e.currentTarget.value}
            placeholder='0'
            disabled
          />
          <Button onClick={addItemHandler}>+</Button>
        </div>
        <div className='menu-card__menu-order mt-4'>
          <Button onClick={addOrderHandler} className='w-full'>
            Order
          </Button>
        </div>
      </div>
    </article>
  );
};
