// import { getOrdersData } from '@/api/db';
import { OngoingOrdersList } from './OngoingOrdersList';

const OngoingOrders = async () => {
  // const { data: orderData, error } = await getOrdersData();

  // if (error) {
  //   console.error('Error fetching data: ', error);
  //   return <p>Error loading menu items</p>;
  // }

  // if (!Array.isArray(orderData)) {
  //   console.error('Unexpected data format', orderData);
  //   return <p>Unexpected data format</p>;
  // }

  return (
    <section className='ongoing-orders-section py-32 px-[4%] lg:px-[2%]'>
      <div className='ongoing-orders-section__content'>
        <OngoingOrdersList />
      </div>
    </section>
  );
};

export default OngoingOrders;
