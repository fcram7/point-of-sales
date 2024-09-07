import { getItemData } from '@/api/db';
import { MenuList } from './_components/MenuList';

export const MenuSection = async () => {
  const { data: menuData = [], error } = await getItemData();

  if (error) {
    console.error('Error fetching data: ', error);
    return <p>Error loading menu items</p>;
  }

  if (!Array.isArray(menuData)) {
    console.error('Unexpected data format', menuData);
    return <p>Unexpected data format</p>;
  }

  return (
    <section className='menu-section py-20'>
      <MenuList menuItem={menuData} />
    </section>
  );
};
