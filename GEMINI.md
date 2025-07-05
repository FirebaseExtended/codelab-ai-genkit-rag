# Project Overview

This project is a travel itinerary generation web application built with Next.js, Genkit, and Firebase. It serves as a codelab to demonstrate how to build Generative AI features, specifically using a Retrieval-Augmented Generation (RAG) pattern.

The application allows users to input their travel preferences (e.g., "a relaxing beach vacation"). It then uses a Genkit flow to retrieve relevant travel destinations from a Firestore database, and generates three distinct itinerary options using a Large Language Model (LLM). The application also has functionality to describe user-uploaded images to enhance the search query.

## Tech Stack

-   **Framework**: Next.js 15
-   **Language**: TypeScript
-   **AI/LLM**: Google Genkit, Vertex AI (Gemini)
-   **Database**: Google Firestore (for storing destination and activity data, including vector embeddings)
-   **Styling**: Tailwind CSS, Sass
-   **Linting/Formatting**: ESLint, Prettier

## Project Structure

-   `src/app/`: Contains the Next.js front-end application, with routes for the main page (`/`), the Gemini-powered itinerary generator (`/gemini`), and a legacy version.
-   `src/components/`: Reusable React components used throughout the application.
-   `src/lib/genkit/`: The core of the AI functionality.
    -   `genkit.config.ts`: Configures Genkit, specifying the Vertex AI plugin.
    -   `itineraryFlow.ts`: Defines the main Genkit flow (`itineraryFlow`) that orchestrates the RAG process. It takes user input, retrieves relevant places using the `placesRetriever`, and then calls a prompt to generate itineraries for each place.
    -   `placesRetriever.ts`: Implements the retriever for the RAG pattern. It uses `defineFirestoreRetriever` to search a 'places' collection in Firestore based on vector similarity of the user's query.
    -   `types.ts`: Defines the data structures and schemas for the Genkit flows.
-   `src/lib/hooks/`: Custom React hooks for front-end logic.
-   `prompts/`: Contains the text prompts used by Genkit to generate itineraries (`itineraryGen.prompt`) and image descriptions (`imgDescription.prompt`).
-   `load-firestore-data/`: A separate Node.js script to populate the Firestore database with initial data for places and activities from JSON files.
-   `package.json`: Defines project scripts and dependencies.

## Core Functionality

### Itinerary Generation Flow (`itineraryFlow`)

1.  **Input**: The flow receives a user's travel request (string) and optional image URLs.
2.  **(Optional) Image Description**: If images are provided, it uses a Gemini model to generate a textual description of the images.
3.  **Retrieval (RAG)**: The user's request and the image description are combined into a query. This query is sent to the `placesRetriever`.
4.  **Vector Search**: The `placesRetriever` performs a vector similarity search in the 'places' collection in Firestore to find the most relevant destinations. It is configured to use the `gemini-embedding-001` model.
5.  **Augmentation**: The retrieved destination data (including name, description, and related activities) is used to augment a prompt.
6.  **Generation**: The augmented prompt (`itineraryGen.prompt`) is sent to an LLM (Gemini) to generate a detailed, structured itinerary for each of the retrieved destinations.
7.  **Output**: The flow returns an array of generated itineraries.

## Key Scripts

-   `npm run dev`: Starts the Genkit UI and the Next.js development server concurrently.
-   `npm run build`: Builds the Next.js application for production.
-   `npm run dev:genkit`: Runs the Genkit UI and development server in standalone mode.
-   `npm run lint`: Lints the codebase using ESLint.
