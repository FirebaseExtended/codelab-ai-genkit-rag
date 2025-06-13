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

import { defineFirestoreRetriever } from '@genkit-ai/firebase';
import { vertexAI } from '@genkit-ai/vertexai';

import { getApp, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

import { Activity } from './types';
import { ai, getProjectId } from './genkit.config';

function getOrInitApp() {
  try {
    return getApp();
  } catch (error) {}
  return initializeApp({ projectId: getProjectId() });
}

const app = getOrInitApp();
const firestore = getFirestore(app);

/**
 * Returns activities linked with a known `placeId` using Firebase admin sdk for Firestore.
 */
export const getActivitiesForDestination = async (placeId: string) => {
  if (!placeId) {
    return [];
  }
  const docs = await firestore
    .collection('activities')
    .where('destination', '==', placeId)
    .get();
  const resultData = docs.docs.map((doc) => {
    const data = doc.data() as Activity;
    delete data.embedding;
    return data;
  });
  return resultData;
};

/**
 * Retriever for places based on the `knownFor` field using the Genkit retriever for Firestore.
 */
export const placesRetriever = ai.defineRetriever(
  { name: 'placesRetriever' },
  async () => ({ documents: [{ content: [{ text: 'TODO' }] }] }),
);
// TODO: 1. Replace the lines above with this:
// export const placesRetriever = defineFirestoreRetriever(ai, {
//   name: 'placesRetriever',
//   firestore,
//   collection: 'places',
//   contentField: 'knownFor',
//   vectorField: 'embedding',
//   embedder: vertexAI.embedder('gemini-embedding-001', {
//     outputDimensionality: 768,
//   }),
//   distanceMeasure: 'COSINE',
// });
