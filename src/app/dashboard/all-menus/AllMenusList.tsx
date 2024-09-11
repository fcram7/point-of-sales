'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { AllMenusCard } from './_components/AllMenuCard';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { getItemData } from '@/api/db';
import Link from 'next/link';

interface item {
  id: number;
  item_name: string;
  item_price: number;
  item_category: string;
}

interface menuItem {
  menuItem: Array<item>;
}

export const AllMenusList = () => {
  const [menuItem, setMenuItem] = useState<item[]>([]);

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

  if (menuItem.length === 0) {
    return <p>No data</p>;
  }

  const drinksMenuItem = menuItem.filter(
    (data) => data.item_category === 'drinks'
  );
  drinksMenuItem.sort((a, b) => a.id - b.id);
  
  const foodsMenuItem = menuItem.filter((data) => data.item_category === 'foods');
  foodsMenuItem.sort((a, b) => a.id - b.id);

  const setMealsMenuItem = menuItem.filter(
    (data) => data.item_category === 'setMeals'
  );
  setMealsMenuItem.sort((a, b) => a.id - b.id);

  return (
    <div className='all-menus-list'>
      <div className='all-menus-list__content'>
        <Link className='xl:text-xl' href={`/dashboard`}>Back to menu</Link>
        <Accordion type='single' collapsible className='w-full mt-10'>
          <AccordionItem value='drinks-category'>
            <AccordionTrigger className='xl:text-xl'>Drinks Menu</AccordionTrigger>
            <AccordionContent>
              { drinksMenuItem.length > 0 ? (drinksMenuItem.map((item) => (
                <AllMenusCard key={item.id} id={item.id} itemName={item.item_name} itemPrice={item.item_price} />
              ))) : (
                <p>No Data</p>
              ) }
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='Foods-category'>
            <AccordionTrigger className='xl:text-xl'>Foods Menu</AccordionTrigger>
            <AccordionContent>
              { foodsMenuItem.length > 0 ? (foodsMenuItem.map((item) => (
                <AllMenusCard key={item.id} id={item.id} itemName={item.item_name} itemPrice={item.item_price} />
              ))) : (
                <p>No Data</p>
              ) }
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='Foods-category'>
            <AccordionTrigger className='xl:text-xl'>Set Meals Menu</AccordionTrigger>
            <AccordionContent>
              { setMealsMenuItem.length > 0 ? (setMealsMenuItem.map((item) => (
                <AllMenusCard key={item.id} id={item.id} itemName={item.item_name} itemPrice={item.item_price} />
              ))) : (
                <p>No Data</p>
              ) }
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Button
          onClick={undefined}
          className='fixed all-menus-list__add-menu-btn bottom-5 right-10'
        >
          Add New Menu
        </Button>
      </div>
    </div>
  );
};
