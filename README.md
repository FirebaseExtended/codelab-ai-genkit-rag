# Build gen AI features powered by your data with Firebase Genkit

This is the code for [Build gen AI features powered by your data with Firebase Genkit](https://firebase.google.com/codelabs/ai-genkit-rag) codelab.

## Getting Started

First, update `src/lib/genkit/genkit.config.js` with your own Firebase project id and login using `gcloud auth application-default login`.
See [Genkit documentation](https://firebase.google.com/docs/genkit/plugins/vertex-ai) for more information.

Then install the dependencies:

```bash
npm install
```

Then run Genkit UI standalone sandbox:

```bash
npm run dev:genkit
```

Alternatively, run Genkit UI alongside the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:4000](http://localhost:4000) with your browser to lauch Genkit UI.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the Next.js app.

You can start editing the app by modifying `genkit-functions/src/lib/itineraryFlow.ts`, `src/app/gemini/page.tsx`. The page auto-updates as you edit the file.

## Frontend Appearance and Structure

The frontend of this application is built using Next.js, TypeScript, and Tailwind CSS, creating a modern and responsive user experience.

### Overall Structure and Organization:

*   **Frameworks & Styling:** The project leverages Next.js for its React-based framework, TypeScript for type safety, and Tailwind CSS for utility-first styling.
*   **Layout (`src/app/layout.tsx`):** Defines the main HTML structure, incorporating global fonts (Rubik for display, Lato for sans-serif) and base body styles. It ensures content is centered and has a maximum width on larger screens for a consistent look.
*   **Main Page (`src/app/page.tsx`):** Serves as the landing page, featuring an engaging `TiltedCardsAnimation` at the top, followed by two primary call-to-action buttons: "Find my dream trip" and "Plan my dream trip with AI".
*   **Global Styles (`src/app/globals.scss`):** Contains essential global styling information, including CSS custom properties (variables) for the color palette, base styles for HTML elements (e.g., custom checkboxes), and Tailwind CSS imports and layer configurations.
*   **Components (`src/components/`):** A dedicated directory for reusable UI components that form the building blocks of the interface.

### Key UI Elements and Interactivity:

*   **`TiltedCardsAnimation.tsx`:** This component creates a visually dynamic introduction on the homepage by displaying a central image accompanied by two images that animate with a "tilt" effect.
*   **`DestinationCarousel.tsx`:** Renders a horizontally scrollable carousel of destination images (e.g., Europe, Asia). Users can click on a destination to select it, which subtly fades out the unselected options, providing clear visual feedback.
*   **`SearchInput.tsx`:** A standard search input field, styled with a search icon and placeholder text "Search destination," facilitating easy content discovery.
*   **Navigation:** The application uses Next.js's `<Link>` component for client-side navigation, primarily seen on the main page to direct users to different sections like `/legacy` (Find my dream trip) and `/gemini` (Plan my dream trip with AI).

### HTML/CSS Interaction:

*   Styling is predominantly achieved using Tailwind CSS utility classes directly within the `.tsx` component files, allowing for rapid UI development.
*   `src/app/globals.scss` complements Tailwind by defining global styles, custom utility classes (e.g., `.container`, `.gradient`), and scrollbar aesthetics.
*   A well-defined set of CSS variables in `:root` (within `globals.scss`) allows for consistent theming and easy maintenance of the color scheme.
*   The layout is designed to be responsive, adapting to different screen sizes with specific breakpoints (e.g., `sm:`) for optimized viewing on various devices.

### Visual Features and Theme:

*   **Color Palette:**
    *   Foreground: `#101010` (Primary text and elements)
    *   Background: `#fff` (Main background)
    *   Accent: `#7b4e7f` (A distinct purple for highlights)
    *   Gradients: A blue-to-purple-to-pink gradient (`--gradient-100` to `--gradient-300`) is used for prominent elements like the AI planning CTA.
    *   Grays: Various shades are used for borders, secondary backgrounds, and subtle UI details.
*   **Typography:**
    *   Display Font: Rubik (500 weight)
    *   Sans-serif Font: Lato (400 and 700 weights)
*   **Animations:**
    *   The `TiltedCardsAnimation` provides an engaging entry visual.
    *   The "Plan my dream trip with AI" button includes an `animate-shadow` class, suggesting a subtle interactive hover or focus effect.
*   **Overall Impression:** The application presents a modern, clean, and visually appealing interface. It emphasizes imagery (especially for destinations) and clear calls to action, aligning well with its likely purpose as a travel or trip-planning tool.
