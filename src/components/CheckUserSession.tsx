import { getUserSession } from '@/api/auth';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

interface checkUserSession {
  routeTo: string;
  children: ReactNode;
}

export const CheckUserSession = ({ routeTo, children }: checkUserSession) => {
  const router = useRouter();

  //user session check
  useEffect(() => {
    const checkUserSession = async () => {
      const { data } = await getUserSession();

      if (data && data.session) {
        router.push(routeTo);
      } else {
        router.push('/');
      }
    };

    checkUserSession();
  }, [router, routeTo]);

  return <>{children}</>;
};
