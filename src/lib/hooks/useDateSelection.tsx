import { useCallback } from 'react';

type Props = {
  selectedDates: Date[];
  setSelectedDates: (dates: Date[]) => void;
};

export const useDateSelection = ({
  selectedDates,
  setSelectedDates,
}: Props) => {
  const handleSelectDate = useCallback(
    (day: number) => {
      const newDate = new Date(2024, 4, day);
      const newDates = (() => {
        const existingIndex = selectedDates.findIndex(
          (date) => date.getDate() === day,
        );

        if (selectedDates.length > 0) {
          if (day < selectedDates[0].getDate()) {
            return [newDate];
          } else if (existingIndex === -1 && selectedDates.length === 1) {
            return [selectedDates[0], newDate];
          }
        }

        return [newDate];
      })();
      setSelectedDates(newDates);
    },
    [selectedDates, setSelectedDates],
  );

  const isDateSelected = useCallback(
    (day: number) => {
      const dayDate = new Date(2024, 4, day);
      if (selectedDates.length >= 2) {
        const firstDate = selectedDates[0];
        const lastDate = selectedDates[selectedDates.length - 1];
        return dayDate >= firstDate && dayDate <= lastDate;
      }
      return selectedDates.some((date) => date.getDate() === day);
    },
    [selectedDates],
  );

  const isFirstSelected = useCallback(
    (day: number) =>
      selectedDates.length > 0 && selectedDates[0].getDate() === day,
    [selectedDates],
  );

  const isLastSelected = useCallback(
    (day: number) =>
      selectedDates.length > 1 &&
      selectedDates[selectedDates.length - 1].getDate() === day,
    [selectedDates],
  );

  return { handleSelectDate, isDateSelected, isFirstSelected, isLastSelected };
};
