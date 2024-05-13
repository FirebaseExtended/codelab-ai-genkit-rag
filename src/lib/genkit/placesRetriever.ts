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
import { textEmbeddingGecko } from '@genkit-ai/vertexai';

import { getApp, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

import { Activity } from './types';
import { getProjectId } from './genkit.config';

function getOrInitApp() {
  try {
    return initializeApp({
      projectId: getProjectId(),
    });
  } catch (error) {
    console.error(error);
  }
  return getApp();
}

const app = getOrInitApp();
const firestore = getFirestore(app);

/**
 * Returns activities linked with a known `placeId` using Firebase admin sdk for Firestore.
 */
export const getActivitiesForDestination = async (placeId: string) => {
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
export const placesRetriever = defineFirestoreRetriever({
  name: 'placesRetriever',
  firestore,
  collection: 'places',
  contentField: 'knownFor',
  vectorField: 'embedding',
  embedder: textEmbeddingGecko,
  distanceMeasure: 'COSINE',
});
