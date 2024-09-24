import { getUserSession } from '@/api/auth';
import { loggedInStatusStore } from '@/utils/zustand/loggedInStatus';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

interface checkUserSession {
  routeTo: string;
  children: ReactNode;
}

export const CheckUserSession = ({ routeTo, children }: checkUserSession) => {
  // const [loading, setLoading] = useState(true);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { setIsLoggedInStatus } = loggedInStatusStore();
  const router = useRouter();

  //user session check
  useEffect(() => {
    const checkUserSession = async () => {
      const { data } = await getUserSession();

      if (data && data.session) {
        setIsLoggedInStatus(true);
        // setLoading(false);
        router.push(routeTo);
      } else {
        router.push('/');
        // setLoading(false);
      }
    };

    checkUserSession();
  }, [router, routeTo, setIsLoggedInStatus]);

  // if (loading) return null;

  // return isLoggedIn ? <>{children}</> : null;
  return <>{children}</>;
};
