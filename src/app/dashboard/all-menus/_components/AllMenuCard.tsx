import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface item {
  itemName: string;
  itemPrice: number;
}

export const AllMenusCard = ({ itemName, itemPrice }: item) => {
  return (
    <article className='all-menus-card'>
      <div className='all-menus-card__content'>
        <Card className='w-full'>
          <CardHeader>
            <CardTitle>{itemName}</CardTitle>
            {/* <CardDescription>{itemCategory}</CardDescription> */}
          </CardHeader>
          <CardContent>
            <p>INGREDIENTS</p>
            <p>{itemPrice}</p>
          </CardContent>
          <CardFooter className='flex items-center justify-end gap-4'>
            <Button type='button'>Edit Menu</Button>
            <Button type='button'>Delete Menu</Button>
          </CardFooter>
        </Card>
      </div>
    </article>
  )
};
