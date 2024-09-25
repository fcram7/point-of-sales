import { OngoingOrdersList } from './OngoingOrdersList';

const OngoingOrders = async () => {
  return (
    <section className='ongoing-orders-section py-32 px-[4%] lg:px-[2%]'>
      <div className='ongoing-orders-section__content'>
        <OngoingOrdersList />
      </div>
    </section>
  );
};

export default OngoingOrders;
