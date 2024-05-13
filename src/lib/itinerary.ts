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

// @ts-nocheck
'use server';

import { UPLOAD_IMG_ENDPOINT } from './constants';

import './genkit/genkit.config';
import { ItineraryFlowOutput } from './genkit/types';
import { itineraryFlow } from './genkit/itineraryFlow';

import { runFlow } from '@genkit-ai/flow';

export async function generateItinerary(
  previousState: null | undefined | ItineraryFlowOutput,
  formData: FormData,
): Promise<ItineraryFlowOutput | undefined> {
  const request = formData.get('request');
  const images = []; // formData.getAll('images[]') as File[]; -- fix upload content-type

  const imageUrls = await Promise.all(
    images.filter((i) => i.size > 0).map(uploadImageAndGetUrl),
  );

  return await runFlow(itineraryFlow, {
    request: request.toString(),
    imageUrls,
  });
}

async function uploadImageAndGetUrl(image: File): Promise<string> {
  const uploadRes = await fetch(UPLOAD_IMG_ENDPOINT);
  const { uploadLocation, downloadLocation } = (await uploadRes.json()) || {};

  if (!uploadLocation || !downloadLocation) {
    throw new Error('Failed to get upload and download locations');
  }

  const response = await fetch(uploadLocation, {
    method: 'PUT',
    body: image,
    headers: { 'Content-Type': image.type },
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return downloadLocation;
}
