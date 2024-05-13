export type Tag = 'Beach' | 'City' | 'Couples' | 'Hiking' | 'Sights';

export type Activity = {
  activityRef: string;
  activityTitle: string;
  activityDesc: string;
  imgUrl: string;
};

export type Itinerary = {
  day: number;
  date: string;
  planForDay: Activity[];
  activityRef: string;
  imgUrl: string;
};

export type Destination = {
  itinerary: Itinerary[];
  place: string;
  itineraryName: string;
  startDate: string;
  endDate: string;
  tags: string[];
  itineraryImageUrl: string;
  placeRef: string;
};
