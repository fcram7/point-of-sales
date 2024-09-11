import { getItemData } from '@/api/db';
import { MenuList } from './_components/MenuList';

export const MenuSection = async () => {
  return (
    <section className='menu-section py-20'>
      <MenuList />
    </section>
  );
};
