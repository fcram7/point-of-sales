'use client';

import { MouseEvent, useEffect, useState } from 'react';
import { Button } from './ui/button';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/api/config';
import { signOut } from '@/api/auth';
import { useRouter } from 'next/navigation';
import { useToast } from './ui/use-toast';
import { ToastAction } from './ui/toast';

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

  const onLogoutHandler = async (e: MouseEvent<HTMLButtonElement>) => {
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
      <nav className='navbar-content py-4 flex items-center justify-between'>
        <div className='navbar-logo text-2xl text-slate-900'>
          <h1>SimplePOS</h1>
        </div>

        {loggedInUser ? (
          <Button type='button' onClick={onLogoutHandler}>
            Logout
          </Button>
        ) : (
          <Button disabled>No Login Detected</Button>
        )}
      </nav>
    </header>
  );
};
