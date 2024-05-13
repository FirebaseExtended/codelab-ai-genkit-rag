import { useMemo } from 'react';

const format = (day: number) => {
  if (day > 3 && day < 21) return `${day}th`;
  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
};

export const useFormattedDates = (dates: Date[]) => {
  return useMemo(() => {
    if (dates.length === 0) {
      return '';
    } else if (dates.length === 1) {
      const date = dates[0];
      return `${format(date.getDate())} ${date.toLocaleString('default', {
        month: 'long',
      })}`;
    } else {
      const firstDate = dates[0];
      const lastDate = dates[dates.length - 1];
      return `${format(firstDate.getDate())}-${format(
        lastDate.getDate(),
      )} ${firstDate.toLocaleString('default', { month: 'long' })}`;
    }
  }, [dates]);
};
