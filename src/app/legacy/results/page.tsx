'use client';

import TripCard from '@/components/TripCard';
import { Tag } from '@/lib/gemini/types';
import { LEGACY } from '@/lib/routes';
import HomeButton from '@/components/HomeButton';
import destinationsJson from '@/data/destinations.json';
import { useSearchParams, useRouter } from 'next/navigation';
import { useFormattedDates } from '@/lib/hooks/useFormattedDates';

export default function LegacyResultsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const { destination, checkIn, checkOut, guests } = searchParams;
  const { toString: searchParamsToString } = useSearchParams();
  const router = useRouter();

  const totalGuests = guests ? parseInt(guests as string, 10) : 1;

  const places = destinationsJson.filter(
    ({ continent }) => continent === destination,
  );

  const dates = useFormattedDates([new Date(checkIn), new Date(checkOut)]);

  return (
    <main className="container relative flex flex-col gap-6 bg-background py-5">
      <HomeButton className="border-gray-100 backdrop-blur-xl" />

      <section className="px-5 mr-[50px]">
        <button
          type="button"
          className="rounded-xl text-lg leading-[1] border border-gray-100 px-5 py-5 w-full bg-background text-left line-clamp-1 truncate"
          onClick={() => window.history.back()}
        >
          {`${destination} • ${dates.replace(/-/g, ' - ')} • ${totalGuests} ${
            totalGuests > 1 ? 'People' : 'Person'
          }`}
        </button>
      </section>

      {/* Trip cards */}
      <section className="grid grid-cols-2 gap-4 px-5">
        {places.map((place, index) => (
          <TripCard
            key={index}
            size="sm"
            title={place.name}
            image={place.imageUrl}
            tags={place.tags as unknown as Tag[]}
            onClick={() => {
              router.push(
                `${LEGACY.ACTIVITIES}?${searchParamsToString()}&place=${place.ref}`,
              );
            }}
          />
        ))}
      </section>
    </main>
  );
}
