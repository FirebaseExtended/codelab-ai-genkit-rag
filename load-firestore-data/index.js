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

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("firebase-admin/app");
const firestore_1 = require("firebase-admin/firestore");
const fs_1 = require("fs");
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
const app = (0, app_1.initializeApp)({
    projectId: getProjectId(),
});
const firestore = (0, firestore_1.getFirestore)(app);
function downloadData(baseCollection_1) {
    return __awaiter(this, arguments, void 0, function* (baseCollection, outputLocation = `${dataDir}/${baseCollection}.json`) {
        console.log(`Getting all docs in ${baseCollection}`);
        const data = yield firestore.collection(baseCollection).get();
        const out = data.docs.map((doc) => doc.data());
        console.log(`Writing to ${outputLocation}`);
        (0, fs_1.writeFileSync)(outputLocation, JSON.stringify(out, null, 2));
    });
}
function uploadData(baseCollection_1) {
    return __awaiter(this, arguments, void 0, function* (baseCollection, fileLocation = `${dataDir}/${baseCollection}.json`) {
        console.log(`Loading ${fileLocation}`);
        const data = (0, fs_1.readFileSync)(fileLocation, 'utf8');
        const docs = JSON.parse(data);
        const total = docs.length;
        for (let index = 0; index < docs.length; index += sliceSize) {
            const slice = docs.slice(index, index + sliceSize);
            yield Promise.all(slice.map((d) => {
                const doc = Object.assign({}, d);
                if (doc.embedding) {
                    doc.embedding = firestore_1.FieldValue.vector(doc.embedding['_values']);
                }
                return firestore.collection(baseCollection).add(doc);
            }));
            console.log(`Added %d of %d ${baseCollection}`, index + slice.length, total);
        }
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const files = (0, fs_1.readdirSync)(dataDir);
        for (const file of files) {
            yield uploadData(file.replace(/\.json$/, ''));
        }
    });
}
main();
