'use client';

import clsx from 'clsx';
import { Arrow } from './svg';
import { useRouter } from 'next/navigation';

type Props = {
  href?: string;
  className?: string;
};

export default function BackButton({ href, className }: Props) {
  const router = useRouter();

  return (
    <button
      type="button"
      className={clsx(
        className,
        'fixed top-8 left-5 z-50 w-10 h-10 rounded-lg border flex justify-center items-center animate-fade-in',
      )}
      onClick={() => {
        href ? router.push(href) : window.history.back();
      }}
    >
      <Arrow />
    </button>
  );
}
