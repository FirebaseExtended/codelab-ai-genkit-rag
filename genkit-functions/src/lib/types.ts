import z from 'zod';

/**
 * Firestore data object for /places collection
 */
export type Place = {
  continent: string;
  country: string;
  embedding?: unknown;
  imageUrl: string;
  knownFor: string;
  name: string;
  ref: string;
  tags: string[];
};

/**
 * Firestore data object for /activities collection
 */
export interface Activity {
  description: string;
  destination: string;
  duration: number;
  embedding?: undefined;
  familyFriendly: boolean;
  imageUrl: string;
  locationName: string;
  name: string;
  price: number;
  ref: string;
  timeOfDay: string;
}

export const ItineraryFlowInput = z.object({
  request: z.string(),
  imageUrls: z.array(z.string()).optional(),
});

export type ItineraryFlowInput = z.infer<typeof ItineraryFlowInput>;

const DayActivity = z.object({
  activityRef: z.string(),
  activityTitle: z.string(),
  activityDesc: z.string(),
});

export type DayActivity = z.infer<typeof DayActivity>;

const Itinerary = z.object({
  day: z.number(),
  date: z.string(),
  planForDay: z.array(DayActivity),
  activityRef: z.string(),
  imgUrl: z.string(),
});

export type Itinerary = z.infer<typeof Itinerary>;

const Destination = z.object({
  itinerary: z.array(Itinerary),
  place: z.string(),
  itineraryName: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  tags: z.array(z.string()),
  itineraryImageUrl: z.string(),
  placeRef: z.string(),
});

export type Destination = z.infer<typeof Destination>;

export const ItineraryFlowOutput = z.array(Destination);

export type ItineraryFlowOutput = z.infer<typeof ItineraryFlowOutput>;
