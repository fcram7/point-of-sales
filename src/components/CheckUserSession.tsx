import { getUserSession } from '@/api/auth';
import { useRouter } from 'next/navigation';
import { Children, ReactNode, useEffect } from 'react';
import { useToast } from './ui/use-toast';
import { ToastAction } from './ui/toast';

interface checkUserSession {
  routeTo: string;
  children: ReactNode;
}

export const CheckUserSession = ({ routeTo, children }: checkUserSession) => {
  const router = useRouter();
  // const { toast } = useToast();

  useEffect(() => {
    const checkUserSession = async () => {
      const { data } = await getUserSession();

      if (data && data.session) {
        router.push(routeTo);
      } else {
        router.push('/');

        // return toast({
        //   title: 'No session detected',
        //   action: (
        //     <ToastAction altText='Click to close notification'>Close</ToastAction>
        //   )
        // })
      }
    };

    checkUserSession();
  }, [router, routeTo]);

  return <>{children}</>;
};
