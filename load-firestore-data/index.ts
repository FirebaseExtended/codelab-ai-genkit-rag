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

import { initializeApp } from 'firebase-admin/app';
import { FieldValue, getFirestore } from 'firebase-admin/firestore';
import { readFileSync, writeFileSync, readdirSync } from 'fs';

const activitiesCollection = 'activities';
const placesCollection = 'places';
const sliceSize = 100;
const dataDir = './data';

const getProjectId = () => {
  if (process.argv.length !== 3) {
    throw new Error('Usage: node index.js YOUR_PROJECT_ID');
  }
  return process.argv[2];
};

export interface DataWithEmbedding {
  embedding?: any;
}

const app = initializeApp({
  projectId: getProjectId(),
});

const firestore = getFirestore(app);

async function downloadData(
  baseCollection: string,
  outputLocation: string = `${dataDir}/${baseCollection}.json`,
) {
  console.log(`Getting all docs in ${baseCollection}`);
  const data = await firestore.collection(baseCollection).get();
  const out = data.docs.map((doc) => doc.data() as JSON);
  console.log(`Writing to ${outputLocation}`);
  writeFileSync(outputLocation, JSON.stringify(out, null, 2));
}

async function uploadData(
  baseCollection: string,
  fileLocation: string = `${dataDir}/${baseCollection}.json`,
) {
  console.log(`Loading ${fileLocation}`);
  const data = readFileSync(fileLocation, 'utf8');
  const docs = JSON.parse(data) as DataWithEmbedding[];
  const total = docs.length;
  for (let index = 0; index < docs.length; index += sliceSize) {
    const slice = docs.slice(index, index + sliceSize);
    await Promise.all(
      slice.map((d) => {
        const doc = { ...d };
        if (doc.embedding) {
          doc.embedding = FieldValue.vector(
            doc.embedding['_values'] as number[],
          );
        }
        return firestore.collection(baseCollection).add(doc);
      }),
    );

    console.log(
      `Added %d of %d ${baseCollection}`,
      index + slice.length,
      total,
    );
  }
}

async function main() {
  const files = readdirSync(dataDir);
  for (const file of files) {
    await uploadData(file.replace(/\.json$/, ''));
  }
}

main();
