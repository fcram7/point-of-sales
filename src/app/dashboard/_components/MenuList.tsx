'use client';

import { categoryStore } from '@/utils/zustand/itemCategory';
import { MenuCard } from './MenuCard';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { OrderModal } from './OrderModal';
import { orderStore } from '@/utils/zustand/order';
import { getItemData, getReservationsData, getTableData } from '@/api/db';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { TableCard } from './TableCard';

interface item {
  id: number;
  item_name: string;
  item_price: number;
  item_category: string;
}

interface tables {
  id: number;
  table_number: number;
  table_capacity: number;
  reservationData: reservations[];
}

interface reservationTime {
  timeStart: string;
  timeEnd: string;
}

interface reservations {
  reservationId: string;
  contactPerson: string;
  contactNumber: string;
  selectedTable: number;
  peopleAmount: number;
  reservationSchedule: Date;
  reservationStarts: string;
  reservationEnds: string;
  // reservationSchedule: string;
  // reservationTime: reservationTime[];
  attendedStatus: boolean;
}

// interface reservations {
//   reservationId: string;
//   contactPerson: string;
//   contactNumber: string;
//   selectedTable: number;
//   peopleAmount: number;
//   bookingSchedule: Date;
// }

export const MenuList = () => {
  const { itemCategory } = categoryStore();
  const { order, setTotal } = orderStore();
  const [menuItem, setMenuItem] = useState<item[]>([]);
  const [tableItem, setTableItem] = useState<tables[]>([]);
  // const [reservationItem, setReservationItem] = useState<reservations[]>([]);

  useEffect(() => {
    const fetchAllMenus = async () => {
      const { data, error } = await getItemData();

      if (error) {
        console.error('Error fetching menus data: ', error.message);
      }

      setMenuItem(data as item[]);
    };

    fetchAllMenus();
  }, []);

  useEffect(() => {
    const fetchAllTables = async () => {
      const { data, error } = await getTableData();

      if (error) {
        console.error('Error fetching tables data: ', error.message);
      }

      setTableItem(data as tables[]);
    };

    fetchAllTables();
  }, []);

  // useEffect(() => {
  //   const fetchAllReservations = async () => {
  //     const { data, error } = await getReservationsData();

  //     if (error) {
  //       console.error('Error fetching reservations data: ', error.message);
  //     }

  //     setReservationItem(data as reservations[]);
  //   }

  //   fetchAllReservations();
  // }, [])



  const inputButtonHandler = () => {
    let totalAmount = order.reduce((acc, item) => acc + item.orderTotal, 0);

    setTotal(totalAmount);
  };

  const cancelButtonHandler = () => {
    location.reload();
  };

  const categorizedMenuData = menuItem?.filter(
    (data) => data.item_category === itemCategory
  );

  // const filteredReservationData = reservationItem.filter((data) => data.selectedTable === )

  categorizedMenuData.sort((a, b) => a.id - b.id);

  return (
    <div
      className={`menu-section__content grid ${
        itemCategory === 'drinks' ||
        itemCategory === 'foods' ||
        itemCategory === 'setMeals'
          ? 'xl:grid-cols-5'
          : 'xl:grid-cols-1'
      } gap-4 relative`}
    >
      {itemCategory === 'drinks' ||
      itemCategory === 'foods' ||
      (itemCategory === 'setMeals' && categorizedMenuData.length > 0) ? (
        categorizedMenuData.map((menu: item) => (
          <MenuCard
            key={menu.id}
            itemName={menu.item_name}
            itemPrice={menu.item_price}
          />
        ))
      ) : itemCategory === 'tables' && itemCategory.length > 0 ? (
        tableItem.map((table) => (
          <TableCard
            key={table.id}
            tableNumber={table.table_number}
            tableCapacity={table.table_capacity}
            reservationData={table.reservationData}
          />
        ))
      ) : (
        <p>No data!</p>
      )}

      <Dialog>
        <DialogTrigger asChild>
          <Button
            onClick={inputButtonHandler}
            disabled={order.length > 0 ? false : true}
            className={`fixed menu-section__input-order-btn bottom-5 right-10 ${itemCategory === 'tables' ? 'hidden' : ''}`}
          >
            Input Order
          </Button>
        </DialogTrigger>
        <DialogContent className='max-w-lg bg-secondary' aria-describedby={undefined}>
          {order.length > 0 ? (
            <div className='menu-section__modal-wrapper flex justify-center'>
              <OrderModal cancelButtonHandler={cancelButtonHandler} />
            </div>
          ) : (
            ''
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
