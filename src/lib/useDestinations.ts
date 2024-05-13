'use client';

import { useEffect, useState } from 'react';

import { Destination } from './gemini/types';
import { DESTINATIONS_LOCAL_STORAGE_KEY } from './constants';

export default function useDestinations() {
  const [destinations, setDestinations] = useState<
    Destination[] | undefined | null
  >();

  useEffect(() => {
    const localStorageDestination = localStorage.getItem(
      DESTINATIONS_LOCAL_STORAGE_KEY,
    );

    try {
      if (localStorageDestination) {
        setDestinations(JSON.parse(localStorageDestination));
        return;
      }
    } catch (e) {
      // JSON.parse error, ignore and set destination null
    }

    setDestinations(null);
  }, []);

  return { destinations };
}
