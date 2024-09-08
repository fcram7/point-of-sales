import { getItemData } from '@/api/db'
import { AllMenusList } from './AllMenusList';

const AllMenus = async () => {
  const { data: menuData = [], error } = await getItemData();

  if(error) {
    console.error(error.message);

    return <p>Error Loading Menu Item</p>
  }

  if(!Array.isArray(menuData)) {
    console.error('Unexpected data format ', menuData);

    return <p>Unexpected menu data format</p>
  }

  return (
    <section className="all-menus-section py-section px-small lg:px-large">
      <div className="all-menus-section__content">
        <AllMenusList menuItem={menuData} />
      </div>
    </section>
  )
}

export default AllMenus;