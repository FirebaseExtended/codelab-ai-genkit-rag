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

import Link from 'next/link';
import BackButton from '@/components/BackButton'; // Assuming you have a BackButton component

export default function AboutPage() {
  return (
    <main className="container flex flex-col items-center min-h-[100dvh] sm:min-h-fit bg-background p-5">
      <div className="w-full flex justify-start">
        <BackButton />
      </div>
      <h1 className="text-2xl font-bold my-8 text-foreground">About The App</h1>
      <section className="w-full text-left">
        <p className="text-lg text-foreground mb-4">
          This application helps you plan your dream trips!
        </p>
        <p className="text-foreground mb-2">
          You can:
        </p>
        <ul className="list-disc list-inside text-foreground mb-4">
          <li>Discover amazing destinations.</li>
          <li>Find interesting activities.</li>
          <li>Leverage AI to generate personalized itineraries.</li>
        </ul>
        <p className="text-foreground">
          This application is built using modern web technologies including Next.js, TypeScript, and Tailwind CSS.
          It connects with Firebase Genkit to provide AI-powered features.
        </p>
      </section>
      <div className="mt-auto w-full flex justify-center py-4">
        <Link href="/" className="text-accent hover:underline">
          Go back to Home
        </Link>
      </div>
    </main>
  );
}
