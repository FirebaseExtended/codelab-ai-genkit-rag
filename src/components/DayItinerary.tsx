'use client';

import { useState } from 'react';

import { Itinerary } from '@/lib/gemini/types';
import AnimatedActivityCard from './AnimatedActivityCard';

type Props = {
  itinerary: Itinerary;
};

export default function DayItinerary({ itinerary }: Props) {
  const [activeActivityIndex, setActiveActivityIndex] = useState(0);

  return (
    <>
      <h2 className="text-contrast-primary text-2xl font-display font-medium">
        Day {itinerary.day}
      </h2>

      {itinerary.planForDay.map((activity, index) => (
        <AnimatedActivityCard
          key={`${activity.activityRef}-${index}`}
          date={itinerary.date}
          name={activity.activityTitle}
          description={activity.activityDesc}
          imgUrl={activity.imgUrl}
          index={index}
          activeIndex={activeActivityIndex}
          setActiveIndex={setActiveActivityIndex}
        />
      ))}
    </>
  );
}
