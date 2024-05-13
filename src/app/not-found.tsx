import Link from 'next/link';

import { HOME } from '@/lib/routes';

export default function NotFound() {
  return (
    <main className="container flex flex-col gap-10 justify-center items-center min-h-[100dvh] sm:min-h-fit bg-background">
      <h1 className="text-[32px] font-display">Page not found</h1>

      <Link
        href={HOME}
        className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
      >
        Go back home
      </Link>
    </main>
  );
}
