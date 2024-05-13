'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';

import DreamingOverlay from '@/components/DreamingOverlay';
import FormFields from '@/components/FormFields';

import { DESTINATIONS_LOCAL_STORAGE_KEY } from '@/lib/constants';
import { generateItinerary } from '@/lib/itinerary';
import { GEMINI } from '@/lib/routes';

export const maxDuration = 60;

type generateItineraryArgs = Parameters<typeof generateItinerary>;

export default function GeminiPromptPage() {
  const router = useRouter();
  const [itinerary, formAction] = useFormState<
    generateItineraryArgs[0],
    generateItineraryArgs[1]
  >(generateItinerary, null);

  useEffect(() => {
    if (itinerary) {
      localStorage.setItem(
        DESTINATIONS_LOCAL_STORAGE_KEY,
        JSON.stringify(itinerary),
      );

      router.push(GEMINI.RESULTS);
    }
  }, [itinerary, router]);

  return (
    <main className="container relative fle x flex-col gap-6 bg-surface text-background">
      <form action={formAction}>
        {/* 
          Both components below are needed due to useFormStatus() usage.
          "useFormStatus will not return status information for a <form> rendered in the same component."
          See: https://react.dev/reference/react-dom/hooks/useFormStatus#display-a-pending-state-during-form-submission
        */}
        <FormFields />
        <DreamingOverlay />
      </form>
    </main>
  );
}
