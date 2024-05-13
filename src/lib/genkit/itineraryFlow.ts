/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
    const imgDescription = await run('imgDescription', async () => {
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
      { imgDescription, request: tripDetails.request },
      async () => {
        const docs = await retrieve({
          retriever: placesRetriever,
          query: `${tripDetails.request}\n${imgDescription}`,
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
