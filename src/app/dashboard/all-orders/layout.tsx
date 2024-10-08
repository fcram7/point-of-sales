import type { Metadata } from 'next';
import { Instrument_Sans } from 'next/font/google';

const instrumentSans = Instrument_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dashboard | All Orders',
  description: 'All orders recap data',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className={instrumentSans.className}>{children}</main>;
}
