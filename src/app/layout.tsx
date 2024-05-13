import type { Metadata } from 'next';
import './globals.scss';
import { Rubik, Lato } from 'next/font/google';

const rubik = Rubik({
  subsets: ['latin'],
  weight: '500',
  display: 'swap',
  variable: '--font-display',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Compass',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="flex items-center justify-center min-h-[100dvh]">
      <body
        className={`${rubik.variable} ${lato.variable} font-sans text-foreground flex justify-center sm:-translate-y-0 h-full sm:h-[800px] sm:bg-gray-200 w-full sm:max-w-[412px] sm:shadow-2xl`}
      >
        {children}
      </body>
    </html>
  );
}
