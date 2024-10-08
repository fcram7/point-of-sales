import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface orderItem {
  orderName: string;
  itemPrice: number;
  orderAmount: number;
  orderTotal: number;
}

export const OrderContentCard = ({
  orderName,
  itemPrice,
  orderAmount,
  orderTotal,
}: orderItem) => {
  return (
    <article className='order-content-card'>
      <div className='order-content-card__content'>
        <Card className='border-[#46494C]'>
          <div className='flex items-center justify-between'>
            <CardHeader>
              <CardTitle>{orderName}</CardTitle>
              <CardDescription className='xl:text-md'>
                Item price: {itemPrice}
              </CardDescription>
            </CardHeader>
            <CardContent className='xl:text-xl'>
              Amount ordered: {orderAmount}
            </CardContent>
          </div>
          <div className='flex justify-end'>
            <CardFooter className='xl:text-xl'>Total: {orderTotal}</CardFooter>
          </div>
        </Card>
      </div>
    </article>
  );
};
