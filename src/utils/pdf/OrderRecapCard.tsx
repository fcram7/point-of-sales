import { Text } from '@react-pdf/renderer';
import { OrderItemCard } from './OrderItemCard';

interface orderItem {
  orderName: string;
  itemPrice: number;
  orderAmount: number;
  orderTotal: number;
}

interface allOrdersItem {
  orderId: string;
  customerName: string;
  order: string;
  total: number;
  payment: string;
  queueOrder: boolean;
  createdAt: string;
}

export const OrderRecapCard = ({
  orderId,
  customerName,
  order,
  total,
  payment,
}: allOrdersItem) => {
  const orderObject: orderItem[] = JSON.parse(order);

  const orderData: orderItem[] = Object.values(orderObject);
  return (
    <>
      <Text style={{ fontSize: '10px' }}>{orderId}</Text>
      <Text style={{ fontSize: '10px', paddingLeft: 25 }}>{customerName}</Text>
      <Text style={{ fontSize: '10px' }}></Text>
      {orderData.map((data, index) => (
        <OrderItemCard
          key={index}
          orderName={data.orderName}
          orderAmount={data.orderAmount}
          orderTotal={data.orderTotal}
          itemPrice={data.itemPrice}
        />
      ))}
      <Text style={{ marginTop: 10 }}>Payment method: {payment}</Text>
      <Text style={{ textAlign: 'right', fontSize: '10px' }}>{total}</Text>
    </>
  );
};
