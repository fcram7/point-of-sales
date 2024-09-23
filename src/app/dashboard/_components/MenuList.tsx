'use client';

import { categoryStore } from '@/utils/zustand/itemCategory';
import { MenuCard } from './MenuCard';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { OrderModal } from './OrderModal';
import { orderStore } from '@/utils/zustand/order';
import { getItemData, getTableData, setReservationData } from '@/api/db';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { TableCard } from './TableCard';
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerTrigger } from '@/components/ui/drawer';
import { ReservationInput } from './ReservationInput';
import { z } from 'zod';
import { reservationSchema } from '@/utils/schema/ReservationSchema';
import { useToast } from '@/components/ui/use-toast';
import { reservationStore } from '@/utils/zustand/reservation';

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
  attendedStatus: boolean;
}

export const MenuList = () => {
  const { itemCategory } = categoryStore();
  const { order, setTotal } = orderStore();
  const [menuItem, setMenuItem] = useState<item[]>([]);
  const [tableItem, setTableItem] = useState<tables[]>([]);

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

  const inputButtonHandler = () => {
    let totalAmount = order.reduce((acc, item) => acc + item.orderTotal, 0);

    setTotal(totalAmount);
  };

  const cancelButtonHandler = () => {
    location.reload();
  };

  const { toast } = useToast();
  const { attendedStatus } = reservationStore();

  const reservationSubmitHandler = async (
    values: z.infer<typeof reservationSchema>
  ) => {
    try {
      await setReservationData({
        reservationId: values.reservationId,
        contactPerson: values.contactPerson,
        contactNumber: values.contactNumber,
        selectedTable: values.selectedTable,
        peopleAmount: values.peopleAmount,
        reservationSchedule: values.reservationSchedule,
        reservationStarts: values.reservationStarts,
        reservationEnds: values.reservationEnds,
        attendedStatus: attendedStatus,
      });

      console.log('Submitted values: ', values);

      toast({
        title: 'Submitted date:',
        description: (
          <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
            <code className='text-white'>{values.reservationSchedule.toDateString()}</code>
          </pre>
        )
      })
    } catch (err) {
      console.error(err);
    }
  };

  const categorizedMenuData = menuItem?.filter(
    (data) => data.item_category === itemCategory
  );

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
      <Drawer>
        <DrawerTrigger asChild>
          <Button type='button' className={`fixed menu-section__input-order-btn bottom-5 right-10 ${itemCategory === 'tables' ? '' : 'hidden'}`}>Make Reservation</Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className='all-menus-card__drawer-content px-large xl:px-small'>
            <ReservationInput handleSubmit={reservationSubmitHandler} />
          </div>
          <DrawerFooter>
            <div className='flex w-full items-center justify-center gap-4'>
              <DrawerClose asChild>
                <Button type='button' variant={'outline'} className='hover:border-primary'>
                  Cancel Edit
                </Button>
              </DrawerClose>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
