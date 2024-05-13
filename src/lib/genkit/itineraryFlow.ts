import { retrieve } from '@genkit-ai/ai/retriever';
import { prompt } from '@genkit-ai/dotprompt';
import { defineFlow, run } from '@genkit-ai/flow';

import {
  Activity,
  Place,
  Destination,
  ItineraryFlowInput as ItineraryFlowInput,
  ItineraryFlowOutput as ItineraryFlowOutput,
} from './types';
import {
  getActivitiesForDestination,
  placesRetriever,
} from './placesRetriever';

export interface ItineraryGeneratorPromptInput {
  request: string;
  place: string;
  placeDescription: string;
  activities: Activity[];
}

const generateItinerary = async (request: string, place: Place) => {
  const activities = await getActivitiesForDestination(place.ref);

  const itineraryGenerator =
    await prompt<ItineraryGeneratorPromptInput>('itineraryGen');
  const response = await itineraryGenerator.generate({
    input: {
      request: request,
      place: place.name,
      placeDescription: place.knownFor,
      activities,
    },
  });

  const destination = response.output() as Destination;
  destination.itineraryImageUrl = place.imageUrl;
  destination.placeRef = place.ref;
  for (let i = 0; i < destination.itinerary.length; i++) {
    const day = destination.itinerary[i];
    for (let j = 0; j < day.planForDay.length; j++) {
      const activityRef = day.planForDay[j].activityRef;
      day.planForDay[j].imgUrl =
        `https://storage.googleapis.com/tripedia-images/activities/${place.ref}_${activityRef}.jpg`;
    }
  }
  return destination;
};

// @ts-ignore
export const itineraryFlow = defineFlow(
  {
    name: 'itineraryFlow',
    inputSchema: ItineraryFlowInput,
    outputSchema: ItineraryFlowOutput,
  },

  async (tripDetails) => {
    const imageDescription = await run('imgDescription', async () => {
      if (!tripDetails.imageUrls?.length) {
        return '';
      }
      const imgDescription = await prompt('imgDescription');
      const result = await imgDescription.generate({
        input: { imageUrls: tripDetails.imageUrls },
      });
      return result.text();
    });

    const places = await run(
      'Retrieve matching places',
      { imageDescription, request: tripDetails.request },
      async () => {
        const docs = await retrieve({
          retriever: placesRetriever,
          query: `${tripDetails.request}\n${imageDescription}`,
          options: {
            limit: 3,
          },
        });
        return docs.map((doc) => {
          const data = doc.toJSON();
          const place = data.metadata as Place;
          if (data.content[0].text) {
            place.knownFor = data.content[0].text;
          }
          delete place.embedding;
          return place;
        });
      },
    );

    const itineraries = await Promise.all(
      places.map((place, i) =>
        run(`Generate itinerary #${i + 1}`, () =>
          generateItinerary(tripDetails.request, place),
        ),
      ),
    );
    return itineraries;
  },
);
