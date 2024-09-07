'use client'

import { updateQueueOrder } from '@/api/db';
import { Button } from '@/components/ui/button';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import { orderStore } from '@/utils/zustand/order';

interface orderItem {
  orderName: string;
  itemPrice: number;
  orderAmount: number;
  orderTotal: number;
}

interface ongoingOrdersItem {
  orderId: string;
  customerName: string;
  order: string;
  total: number;
  payment: string;
  queueOrder?: boolean;
}

export const OngoingOrdersCard = ({ orderId, customerName, order, total, payment, queueOrder }: ongoingOrdersItem) => {
  const orderObject: orderItem[] = JSON.parse(order);

  const orderData: orderItem[] = Object.values(orderObject);

  const { toast } = useToast();

  const { inQueue, setInQueue } = orderStore();

  const finishOrderButtonHandler = async () => {
    try {
      setInQueue(false);
      await updateQueueOrder(orderId, inQueue);
      toast({
        title: `${orderId} is finished`,
        action: (
          <ToastAction altText='Click to close notification'>Close</ToastAction>
        ),
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <article className="ongoing-orders-card border-2 border-slate-400 py-4 px-6">
      <div className="ongoing-order-card__content flex items-center justify-between">
        <div className="ongoing-orders-card__order-customer-detail">
          <p>Order ID: {orderId}</p>
          <p>Customer Name: {customerName}</p>
        </div>
        <div className="ongoing-orders-card__order-detail">
          <p>{payment}</p>
        </div>
      </div>
      { orderData.map((item, index) => (
        <div className="ongoing-order-card__order-item my-4 grid gap-4 border-t-2 border-slate-400" key={index}>
          <div className="ongoing-order-card__order-item-content mt-2 px-2">
            <div className="ongoing-order-card__order-item-detail flex items-center justify-between">
              <p>{item.orderName}</p>
              <p>Order Amount: {item.orderAmount}</p>
            </div>
            <div className="ongoing-order-card__order-item-prices flex items-center justify-between">
              <p>Item Price: {item.itemPrice}</p>
              <p>Total: {item.orderTotal}</p>
            </div>
          </div>
        </div>
      )) }

      <p className='text-right xl:text-xl'>Total: {total}</p>
      { queueOrder ? (
        <div className="ongoing-order-card__finish-order-btn-container flex justify-end mt-4">
          <Button type='button' onClick={finishOrderButtonHandler}>Finish Order</Button>
        </div>
      ): (
        null
      )}
    </article>
  )
}