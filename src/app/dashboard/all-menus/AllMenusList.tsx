import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { AllMenusCard } from './_components/AllMenuCard';

interface item {
  id: number;
  item_name: string;
  item_price: number;
  item_category: string;
}

interface menuItem {
  menuItem: Array<item>;
}

export const AllMenusList = ({ menuItem }: menuItem) => {
  if (menuItem.length === 0) {
    return <p>No data</p>;
  }

  const drinksMenuItem = menuItem.filter(
    (data) => data.item_category === 'drinks'
  );
  const foodsMenuItem = menuItem.filter((data) => data.item_category === 'foods');
  const setMealsMenuItem = menuItem.filter(
    (data) => data.item_category === 'setMeals'
  );

  return (
    <div className='all-menus-list'>
      <div className='all-menus-list__content'>
        <Accordion type='single' collapsible className='w-full'>
          <AccordionItem value='drinks-category'>
            <AccordionTrigger className='xl:text-xl'>Drinks Menu</AccordionTrigger>
            <AccordionContent>
              { drinksMenuItem.length > 0 ? (drinksMenuItem.map((item) => (
                <AllMenusCard key={item.id} itemName={item.item_name} itemPrice={item.item_price} />
              ))) : (
                <p>No Data</p>
              ) }
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='Foods-category'>
            <AccordionTrigger className='xl:text-xl'>Foods Menu</AccordionTrigger>
            <AccordionContent>
              { foodsMenuItem.length > 0 ? (foodsMenuItem.map((item) => (
                <AllMenusCard key={item.id} itemName={item.item_name} itemPrice={item.item_price} />
              ))) : (
                <p>No Data</p>
              ) }
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='Foods-category'>
            <AccordionTrigger className='xl:text-xl'>Set Meals Menu</AccordionTrigger>
            <AccordionContent>
              { setMealsMenuItem.length > 0 ? (setMealsMenuItem.map((item) => (
                <AllMenusCard key={item.id} itemName={item.item_name} itemPrice={item.item_price} />
              ))) : (
                <p>No Data</p>
              ) }
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};
