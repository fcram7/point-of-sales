import { Text, StyleSheet, View } from '@react-pdf/renderer';

interface orderItem {
  orderName: string;
  itemPrice: number;
  orderAmount: number;
  orderTotal: number;
}

const styles = StyleSheet.create({
  orderItemCard: {
    fontSize: '10px',
    maxWidth: 180,
  },
});

export const OrderItemCard = ({
  orderName,
  itemPrice,
  orderAmount,
  orderTotal,
}: orderItem) => (
  <View style={styles.orderItemCard}>
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 80,
      }}
    >
      <Text>{orderName}</Text>
      <Text style={{ paddingLeft: 40 }}>x{orderAmount}</Text>
    </View>
  </View>
);
