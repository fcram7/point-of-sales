'use client';

import { MouseEvent, useEffect, useState } from 'react';
import { Button } from './ui/button';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/api/config';
import { signOut } from '@/api/auth';
import { useRouter } from 'next/navigation';
import { useToast } from './ui/use-toast';
import { ToastAction } from './ui/toast';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './ui/navigation-menu';

export const Navbar = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (e, session) => {
        setLoggedInUser(session?.user ?? null);

        if (e === 'SIGNED_OUT') {
          [window.localStorage, window.sessionStorage].forEach((storage) => {
            Object.entries(storage).forEach(([key]) => {
              storage.removeItem(key);
            });
          });
        }
      }
    );

    return () => authListener.subscription.unsubscribe();
  }, []);

  const onAllMenusHandler = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();

    router.push('/dashboard/all-menus');
  }

  const onLogoutHandler = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await signOut();
      toast({
        title: 'Successfully Logged Out',
        action: (
          <ToastAction altText='Click to close notification'>Close</ToastAction>
        ),
      });
      router.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header className='navbar-section fixed w-full px-[4%] lg:px-[2%] bg-transparent backdrop-blur-sm z-10 bg-slate-200'>
      <nav className='navbar-section__content py-4 flex items-center justify-between'>
        <div className='navbar-section__logo text-2xl text-slate-900'>
          <h1>SimplePOS</h1>
        </div>

        {loggedInUser ? (
          <>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    {loggedInUser.email === 'superadmin@simplepos.com'
                      ? 'Welcome, superadmin'
                      : null}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className='navbar-section__navmenu-content w-48'>
                      <ul className='navbar-section__navmenu-link-container px-4 py-2 grid gap-4'>
                        <li>
                          <NavigationMenuLink asChild onClick={onAllMenusHandler}>
                            <div className='cursor-pointer xl:text-md'>All Menus</div>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild onClick={onLogoutHandler}>
                            <div className='cursor-pointer xl:text-md'>Logout</div>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </>
        ) : (
          <Button disabled>No Login Detected</Button>
        )}
      </nav>
    </header>
  );
};
