import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { OrderRecapCard } from './OrderRecapCard';
import { rupiah } from '../priceConverter/priceConverter';

interface pdfGenerator {
  selectedDate: string | undefined;
  totalSale: number;
  allOrdersData: allOrdersItem[];
}

interface allOrdersItem {
  order_id: string;
  customer_name: string;
  order: string;
  total: number;
  payment: string;
  queue_order: boolean;
  created_at: string;
}

const styles = StyleSheet.create({
  page: {
    borderBottom: 1,
    borderBottomWidth: 2,
  },
  titleSection: {
    padding: 10,
    margin: 10,
    flexDirection: 'column',
    flex: 1,
    maxHeight: 50,
    borderBottom: 1,
    borderBottomWidth: 2,
  },
  headerSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    margin: 10,
    maxHeight: 35,
    fontSize: '12px',
    borderBottom: 1,
    borderBottomWidth: 1,
  },
  contentSection: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 0,
    padding: 10,
    maxHeight: 150,
    height: 75,
    borderBottom: 1,
    borderBottomWidth: 1,
  },
  totalSection: {
    margin: 10,
    padding: 10,
    fontSize: '18px',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export const OrderRecap = ({
  selectedDate,
  allOrdersData,
  totalSale,
}: pdfGenerator) => (
  <Document>
    <Page size='A4' style={styles.page}>
      <View style={styles.titleSection}>
        <Text>Order Recap for {selectedDate?.slice(0, 15)}</Text>
      </View>
      <View style={styles.headerSection}>
        <Text>Order ID</Text>
        <Text>Customer Name</Text>
        <Text>Orders</Text>
        <Text>Total</Text>
      </View>
      {allOrdersData.map((data, index) => (
        <View style={styles.contentSection} key={index}>
          <OrderRecapCard
            orderId={data.order_id}
            customerName={data.customer_name}
            order={data.order}
            payment={data.payment}
            total={data.total}
            queueOrder={data.queue_order}
            createdAt={data.created_at}
          />
        </View>
      ))}
      <View style={styles.totalSection}>
        <Text>Total Sales:</Text>
        <Text>{rupiah(totalSale)}</Text>
      </View>
    </Page>
  </Document>
);
