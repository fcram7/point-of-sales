'use client'

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { EditMenuCardForm } from './EditMenuCardForm';
import { z } from 'zod';
import { itemsSchema } from '@/utils/schema/ItemsSchema';
import { updateItemData } from '@/api/db';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';

interface item {
  id: number
  itemName: string;
  itemPrice: number;
}

export const AllMenusCard = ({ id, itemName, itemPrice }: item) => {
  const { toast } = useToast();
  const editMenuSubmitHandler = async (values: z.infer<typeof itemsSchema>) => {
    try {
      await updateItemData({
        id: id,
        itemName: values.itemName,
        itemPrice: values.itemPrice,
        itemCategory: values.itemCategory
      });

      toast({
        title: 'Menu successfully edited',
        action: (
          <ToastAction altText='Close notification'>Close</ToastAction>
        )
      })
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <article className='all-menus-card'>
      <div className='all-menus-card__content'>
        <Card className='w-full'>
          <CardHeader>
            <CardTitle>{itemName}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>INGREDIENTS</p>
            <p>{itemPrice}</p>
          </CardContent>
          <CardFooter className='flex items-center justify-end gap-4'>
            <Drawer>
              <DrawerTrigger asChild>
                <Button type='button'>Edit Menu</Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className='w-full'>
                  <DrawerHeader>
                    <div className='flex flex-col items-center gap-4'>
                      <DrawerTitle className='xl:text-3xl'>
                        Edit {itemName} Menu
                      </DrawerTitle>
                      <DrawerDescription className='xl:text-xl'>
                        Modify the name, price, or category of the menu item
                      </DrawerDescription>
                    </div>
                  </DrawerHeader>
                  <div className='all-menus-card__drawer-content px-large xl:px-small'>
                    <EditMenuCardForm itemName={itemName} itemPrice={itemPrice} handleSubmit={editMenuSubmitHandler} />
                  </div>
                  <DrawerFooter>
                    <div className='flex w-full items-center justify-center gap-4'>
                      <DrawerClose asChild>
                        <Button type='button' variant='outline' className='hover:border-primary'>
                          Cancel Edit
                        </Button>
                      </DrawerClose>
                    </div>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>
            <Button type='button' variant='outline'>
              Delete Menu
            </Button>
          </CardFooter>
        </Card>
      </div>
    </article>
  );
};
