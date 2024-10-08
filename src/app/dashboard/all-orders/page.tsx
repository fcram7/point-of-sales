import { AllOrdersList } from './AllOrdersList'

const AllOrders = () => {
  return (
    <section className="all-orders-section py-section px-small lg:px-large">
      <div className="all-order-section__content">
        <AllOrdersList />
      </div>
    </section>
  )
}

export default AllOrders;