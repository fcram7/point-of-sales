import { StyleSheet, Text, View } from '@react-pdf/renderer';

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

const styles = StyleSheet.create({
  orderItemContainer: {
    maxWidth: 150,
    flex: 1,
    flexDirection: 'column',
    gap: '20px',
    justifyContent: 'flex-start',
    paddingTop: 6,
    paddingLeft: 50
  },
  orderItem: {
    fontSize: '8px',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: '12px',
  },
});

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
    <View style={{
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    }}>
      <Text style={{ fontSize: '10px' }}>{orderId}</Text>
      <Text style={{ fontSize: '10px', marginLeft: 10 }}>{customerName}</Text>
      <Text style={{ fontSize: '10px' }}></Text>
      <View style={styles.orderItemContainer}>
        {orderData.map((data, index) => (
          <View style={styles.orderItem} key={index}>
            <Text style={{
              maxWidth: 80
            }}>{data.orderName}</Text>
            <Text>x{data.orderAmount}</Text>
          </View>
        ))}
      </View>
      <Text style={{ textAlign: 'right', fontSize: '10px' }}>{total}</Text>
    </View>
  );
};
