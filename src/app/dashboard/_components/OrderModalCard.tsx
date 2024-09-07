import { rupiah } from '@/utils/priceConverter/priceConverter';

interface orderModalCard {
  itemName: string;
  itemPrice: number;
  orderedItemAmount: number;
  orderedTotal: number;
}

export const OrderModalCard = ({
  itemName,
  itemPrice,
  orderedItemAmount,
  orderedTotal,
}: orderModalCard) => {
  return (
    <article className='order-modal__modal-card border-b-2 border-slate-400 py-2'>
      <div className='order-modal__modal-card-content flex items-center justify-between px-1'>
        <div className='order-modal__ordered-item-detail w-[50%]'>
          <p className='order-modal__ordered-item-name xl:text-md'>
            {itemName}
          </p>
          <div className='flex justify-between items-center gap-6 mt-2'>
            <p className='order-modal__ordered-item-price xl:text-sm'>
              {rupiah(itemPrice)}
            </p>
            <p className='order-modal__ordered-item-amount xl:text-sm'>
              Qty: {orderedItemAmount}
            </p>
          </div>
        </div>

        <p className='order-modal__ordered-item-total'>
          {rupiah(orderedTotal)}
        </p>
      </div>
    </article>
  );
};
