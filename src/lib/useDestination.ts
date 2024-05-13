'use client';

import { useCallback, useEffect, useState } from 'react';

import { Destination } from './gemini/types';
import { DESTINATION_LOCAL_STORAGE_KEY } from './constants';

export default function useDestination() {
  const [destination, setDestination] = useState<
    Destination | undefined | null
  >();

  const setDestinationInLocalStorage = useCallback(
    (newDestination: Destination | undefined | null) => {
      localStorage.setItem(
        DESTINATION_LOCAL_STORAGE_KEY,
        JSON.stringify(newDestination),
      );
    },
    [],
  );

  /**
   * Update localStorage when destination changes
   */
  useEffect(() => {
    if (destination !== undefined) {
      setDestinationInLocalStorage(destination);
    }
  }, [destination, setDestinationInLocalStorage]);

  /**
   * Set destination from localStorage on load
   */
  useEffect(() => {
    const localStorageDestination = localStorage.getItem(
      DESTINATION_LOCAL_STORAGE_KEY,
    );

    try {
      if (localStorageDestination) {
        setDestination(JSON.parse(localStorageDestination));
        return;
      }
    } catch (e) {
      // JSON.parse error, ignore and set destination null
    }

    setDestination(null);
  }, []);

  return { destination, setDestination };
}
