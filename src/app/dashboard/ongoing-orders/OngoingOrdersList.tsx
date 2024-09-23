'use client'

import Link from 'next/link';
import { OngoingOrdersCard } from './_components/OngoingOrdersCard';
import { useEffect, useState } from 'react';
import { getOrdersData } from '@/api/db';

interface ongoingOrdersItem {
  order_id: string;
  customer_name: string;
  order: string;
  total: number;
  payment: string;
  queue_order: boolean;
}

export const OngoingOrdersList = () => {
  const [ongoingOrdersData, setOngoingOrdersData] = useState<ongoingOrdersItem[]>([]);

  const fetchOngoingOrders = async () => {
    console.log('fetching ongoing orders data...');
    const { data, error } = await getOrdersData();

    if(error) {
      console.error(error.message);
    }

    setOngoingOrdersData(data as ongoingOrdersItem[]);
  }

  useEffect(() => {
    fetchOngoingOrders();
  }, []);

  return (
    <div className='ongoing-orders-list'>
      <div className='ongoing-orders-list__content'>
        <h1 className='xl:text-3xl font-semibold mb-6'>Ongoing Orders</h1>
        <Link className='xl:text-xl' href={`/dashboard`}>Back to menu</Link>
        <div className="ongoing-orders-list__order-card-container mt-6 grid gap-4">
          {ongoingOrdersData.length > 0 ? (ongoingOrdersData.map((order, index) => (
            <OngoingOrdersCard
              orderId={order.order_id}
              customerName={order.customer_name}
              order={order.order}
              payment={order.payment}
              total={order.total}
              queueOrder={order.queue_order}
              key={index}
              fetchOngoingOrders={() => fetchOngoingOrders()}
            />
          ))) : (
            <p className='xl:text-2xl'>No order queued</p>
          )}
        </div>
      </div>
    </div>
  );
};
