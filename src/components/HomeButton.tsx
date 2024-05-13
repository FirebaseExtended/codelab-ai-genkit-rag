import clsx from 'clsx';
import { Home } from './svg';

import Link from 'next/link';
import { HOME } from '@/lib/routes';

type Props = {
  className?: string;
};

export default function HomeButton({ className }: Props) {
  return (
    <Link
      href={HOME}
      className={clsx(
        className,
        'fixed top-8 right-5 z-50 w-10 h-10 rounded-lg border flex justify-center items-center',
      )}
    >
      <Home />
    </Link>
  );
}
