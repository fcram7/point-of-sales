'use client';

import { getUser, signUpNewUser } from '@/api/auth';
import { BackToMenu } from '@/components/BackToMenu';
import { CheckUserSession } from '@/components/CheckUserSession';
import { useEffect, useState } from 'react';
import { UserCard } from './_components/UserCard';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { NewUserForm } from './_components/NewUserForm';
import { z } from 'zod';
import { newUserSchema } from '@/utils/schema/NewUserSchema';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';

interface user {
  email: string;
  username: string;
}

export const UserManagementList = () => {
  const [userListData, setUserListData] = useState<user[]>([]);
  const { toast } = useToast();

  const getUserData = async () => {
    const { data, error } = await getUser();

    if (error) {
      console.error(error.message);
    }

    setUserListData(data as user[]);
  };

  const createNewUserSubmitHandler = async (values: z.infer<typeof newUserSchema>) => {
    const { data, userData, error, userError } = await signUpNewUser({
      email: values.email,
      fullName: values.fullName,
      userName: values.username,
      password: values.password
    });

    if (error || userError) {
      return toast({
        title: `Oops! there's an error`,
        description: `${error.message || userError?.message}`,
        action: (
          <ToastAction altText='Click to close notification'>Close</ToastAction>
        )
      })
    }

    getUserData();

    return toast({
      title: 'Successfully created new user',
      action: (
        <ToastAction altText='Click to close notification'>Close</ToastAction>
      )
    })
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <CheckUserSession routeTo='/dashboard/user-management'>
      <div className='user-management-list'>
        <div className='user-management-list__content'>
          <h1 className='user-management-list__title xl:text-3xl font-semibold mb-4'>
            User Management
          </h1>
          <BackToMenu />

          <div className="user-management-list__user-card-container mt-6 grid gap-4">
            {userListData &&
              userListData.map((data, index) => (
                <UserCard
                  key={index}
                  email={data.email}
                  username={data.username}
                />
              ))
            }
          </div>

          <Drawer>
            <DrawerTrigger className='fixed user-management-list__add-user-btn bottom-5 right-10'>
              <Button>
                Add New User
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader className='flex flex-col items-center justify-center'>
                <DrawerTitle className='xl:text-4xl font-semibold'>Create New User</DrawerTitle>
                <DrawerDescription>Create new user to access POS</DrawerDescription>
              </DrawerHeader>
              <div className="user-management-list__add-user-form w-full">
                <NewUserForm handleSubmit={createNewUserSubmitHandler}/>
              </div>
              <DrawerFooter className='flex flex-row items-center justify-center'>
                <DrawerClose>
                  <Button variant='outline' className='border-[#46494C]'>Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </CheckUserSession>
  );
};
