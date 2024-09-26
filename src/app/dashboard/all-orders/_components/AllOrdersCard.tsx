import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { OrderContentCard } from './OrderContentCard';

interface orderItem {
  orderName: string;
  itemPrice: number;
  orderAmount: number;
  orderTotal: number;
}

interface AllOrdersItem {
  orderId: string;
  customerName: string;
  order: string;
  total: number;
  payment: string;
}

export const AllOrdersCard = ({
  orderId,
  customerName,
  order,
  total,
  payment,
}: AllOrdersItem) => {
  const orderObject: orderItem[] = JSON.parse(order);

  const orderData: orderItem[] = Object.values(orderObject);

  return (
    <article className='all-orders-card w-full'>
      <div className='all-orders-card__content'>
        <Card className='border-[#46494C]'>
          <CardHeader>
            <CardTitle>Order by: {customerName}</CardTitle>
            <CardDescription>Order ID: {orderId}</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type='single' collapsible>
              <AccordionItem value='item-orders' className='border-[#46494C]'>
                <AccordionTrigger className='xl:text-xl'>
                  Order Content
                </AccordionTrigger>
                <AccordionContent className='grid gap-4'>
                  {orderData &&
                    orderData.map((item, index) => (
                      <OrderContentCard
                        key={index}
                        orderName={item.orderName}
                        orderAmount={item.orderAmount}
                        itemPrice={item.itemPrice}
                        orderTotal={item.orderTotal}
                      />
                    ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <p className='xl:text-lg mt-4'>Total: {total}</p>
          </CardContent>
          <CardFooter>Payment: {payment}</CardFooter>
        </Card>
      </div>
    </article>
  );
};
