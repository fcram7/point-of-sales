'use client';

import { getAllOrdersData } from '@/api/db';
import { AllOrdersCard } from './_components/AllOrdersCard';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { CheckUserSession } from '@/components/CheckUserSession';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { OrderRecap } from '@/utils/pdf/PdfGenerator';
import Link from 'next/link';

interface allOrdersItem {
  order_id: string;
  customer_name: string;
  order: string;
  total: number;
  payment: string;
  queue_order: boolean;
  created_at: string;
}

export const AllOrdersList = () => {
  const [allOrdersData, setAllOrdersData] = useState<allOrdersItem[]>([]);
  const [orderDate, setOrderDate] = useState<Date>();

  const fetchAllOrders = async () => {
    const { data, error } = await getAllOrdersData();

    if (error) {
      console.error(error.message);
    }

    setAllOrdersData(data as allOrdersItem[]);
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const selectedOrderDate = orderDate?.toISOString().substring(0, 10);

  const filteredOrdersData = allOrdersData.filter(
    (order) => order.created_at.substring(0, 10) === selectedOrderDate
  );

  let totalSale = filteredOrdersData.reduce((acc, item) => acc + item.total, 0)

  return (
    <CheckUserSession routeTo='/dashboard/all-orders'>
      <div className='all-orders-list'>
        <div className='all-orders-list__content'>
          <div className='flex items-center justify-between mb-4'>
            <h1 className='xl:text-3xl font-semibold'>All Orders List</h1>
            <Button
              className='all-orders-list__make-order-recap-btn'
              type='button'
            >
              <PDFDownloadLink document={<OrderRecap totalSale={totalSale} allOrdersData={filteredOrdersData} selectedDate={orderDate?.toString()} />} fileName='order-recap.pdf'>
                Make order recap
              </PDFDownloadLink>
            </Button>
          </div>

          <Link className='xl:text-xl opacity-50 transition-opacity ease-in-out duration-200 hover:opacity-100' href={`/dashboard`}>Back to menu</Link>

          <div className="order-date-selector-container flex gap-4 items-center mt-4">
            <span >Select order date: </span>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-[280px] justify-start text-left font-normal',
                    !orderDate && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className='mr-2 h-4 w-4' />
                  {orderDate ? (
                    format(orderDate, 'PPP')
                  ) : (
                    <span>Filter by date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0'>
                <Calendar
                  mode='single'
                  selected={orderDate}
                  onSelect={setOrderDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className='all-orders-list__orders-card-container mt-8 grid gap-4'>
            {filteredOrdersData ? (
              filteredOrdersData.map((order, index) => (
                <AllOrdersCard
                  key={index}
                  orderId={order.order_id}
                  customerName={order.customer_name}
                  order={order.order}
                  total={order.total}
                  payment={order.payment}
                />
              ))
            ) : (
              <p>No orders were made</p>
            )}
          </div>
        </div>
      </div>
    </CheckUserSession>
  );
};
