'use client';

import { CheckUserSession } from '@/components/CheckUserSession';
import { MenuList } from './_components/MenuList';

export const MenuSection = () => {
  return (
    <CheckUserSession routeTo='/dashboard'>
      <section className='menu-section py-20'>
        <MenuList />
      </section>
    </CheckUserSession>
  );
};
