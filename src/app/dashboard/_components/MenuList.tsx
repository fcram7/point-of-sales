'use client';

import { categoryStore } from '@/utils/zustand/itemCategory';
import { MenuCard } from './MenuCard';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { OrderModal } from './OrderModal';
import { orderStore } from '@/utils/zustand/order';
import { getItemData } from '@/api/db';

interface item {
  id: number;
  item_name: string;
  item_price: number;
  item_category: string;
}

interface filteredMenuItem {
  menuItem: Array<item>;
}

export const MenuList = () => {
  const { itemCategory } = categoryStore();
  const { order, setTotal } = orderStore();
  const [menuItem, setMenuItem] = useState<item[]>([])
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const fetchAllMenus = async () => {
      const { data, error } = await getItemData();

      if (error) {
        console.error('Error fetching data: ', error.message);
      }

      setMenuItem(data as item[]);
    }

    fetchAllMenus();
  }, []);

  const inputButtonHandler = () => {
    let totalAmount = order.reduce((acc, item) => acc + item.orderTotal, 0);

    setTotal(totalAmount);
    setModal(true);
  };

  const cancelButtonHandler = () => {
    setModal(false);
    location.reload();
  };

  const categorizedMenuData = menuItem?.filter(
    (data) => data.item_category === itemCategory
  );

  categorizedMenuData.sort((a, b) => a.id - b.id);

  return (
    <div className='menu-section__content grid xl:grid-cols-5 gap-4 relative'>
      {categorizedMenuData.length > 0 ? (
        categorizedMenuData.map((menu: item) => (
          <MenuCard
            key={menu.id}
            itemName={menu.item_name}
            itemPrice={menu.item_price}
          />
        ))
      ) : (
        <p>No data!</p>
      )}

      <Button
        onClick={inputButtonHandler}
        disabled={order.length > 0 ? false : true}
        className='fixed menu-section__input-order-btn bottom-5 right-10'
      >
        Input Order
      </Button>
      {modal && order.length > 0 ? (
        <div className='menu-section__modal-wrapper flex justify-center'>
          <OrderModal cancelButtonHandler={cancelButtonHandler} />
        </div>
      ) : (
        ''
      )}
    </div>
  );
};
