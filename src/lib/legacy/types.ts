import destinationsJson from '@/data/destinations.json';
import activitiesJson from '@/data/activities.json';

export type Destination = (typeof destinationsJson)[number];
export type Activity = (typeof activitiesJson)[number];
