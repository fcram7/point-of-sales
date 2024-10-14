import Link from 'next/link';

export const BackToMenu = () => {
  return (
    <Link
      className='xl:text-xl opacity-50 transition-opacity ease-in-out duration-200 hover:opacity-100'
      href={`/dashboard`}
    >
      Back to menu
    </Link>
  );
};
