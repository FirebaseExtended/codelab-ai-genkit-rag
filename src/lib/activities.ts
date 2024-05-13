import { Activity } from './legacy/types';

type ActivitiesByDay = {
  [day: string]: Record<string, Activity>;
};

export function getActivitesByDay(
  startDate: Date,
  endDate: Date,
  activities: Activity[],
): ActivitiesByDay {
  const differenceInTime = endDate.getTime() - startDate.getTime();
  const differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24));

  const itemsByDay: ActivitiesByDay = {};

  for (let i = 0; i <= differenceInDays; i++) {
    const currentDate = new Date(startDate).setDate(startDate.getDate() + i);
    const formattedDate = new Date(currentDate)
      .toISOString()
      .split('T')[0] as string;

    itemsByDay[formattedDate] = {};

    activities.forEach((item, itemIndex) => {
      if (!itemsByDay[formattedDate][item.timeOfDay]) {
        itemsByDay[formattedDate][item.timeOfDay] = item;
        delete activities[itemIndex];
      }
    });
  }

  return itemsByDay;
}
