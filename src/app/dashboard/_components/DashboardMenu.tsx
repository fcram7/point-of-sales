'use client';

import { Button } from '@/components/ui/button';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { categoryStore } from '@/utils/zustand/itemCategory';
import { useRouter } from 'next/navigation';

export const DashboardMenu = () => {
  const { setItemCategory } = categoryStore();
  const router = useRouter();

  const ongoingOrdersButtonHandler = () => {
    router.push('/dashboard/ongoing-orders');
  }

  return (
    <div className='dashboard-menu'>
      <div className='dashboard-menu__content flex items-center justify-between'>
        <Menubar className='bg-primary text-secondary'>
          <MenubarMenu>
            <MenubarTrigger>Menu</MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={() => setItemCategory('drinks')}>
                Drinks
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem onClick={() => setItemCategory('foods')}>
                Foods
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem onClick={() => setItemCategory('setMeals')}>
                Set Meals
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Tables</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Reservation</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>

        <Button type='button' onClick={ongoingOrdersButtonHandler}>Ongoing Orders</Button>
      </div>
    </div>
  );
};
