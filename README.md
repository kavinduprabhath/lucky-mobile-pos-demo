# Lucky Mobile POS Demo (updated version)

This project wraps the uploaded updated React/TypeScript POS app in a Vite + Tailwind project, ready to run locally or deploy through GitHub and Vercel.

## Run locally
1. Install Node.js LTS from https://nodejs.org/
2. Extract this ZIP.
3. Open a terminal in the extracted `lucky-pos-demo` folder.
4. Run `npm install`
5. Run `npm run dev`
6. Open the local URL printed in the terminal (usually http://localhost:5173).

## Deploy
Upload the contents of this folder (not the ZIP itself) to a GitHub repository. Import that repository into Vercel. Vercel should detect Vite automatically. Build command: `npm run build`; output directory: `dist`.

## Important
This is a front-end demo. Unless persistence/backend features are added, app data is not automatically shared between users and may reset when refreshed. Do not use real customer data in a public demo. The build has not been verified in this environment.
