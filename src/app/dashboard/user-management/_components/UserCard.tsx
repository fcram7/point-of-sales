import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface user {
  email: string;
  username: string;
}

export const UserCard = ({ email, username }: user) => {
  return (
    <article className="user-card w-full">
      <div className="user-card__content">
        <Card className='border-[#46494C]'>
          <CardHeader>
            <CardTitle>{username}</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <p className="user-card__email">{email}</p>
          </CardContent>
          <CardFooter className='flex gap-4 justify-end'>
            <Button disabled={username === 'superadmin' ? true : false}>Edit</Button>
            <Button>Delete</Button>
          </CardFooter>
        </Card>
      </div>
    </article>
  )
}