This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Mobile learning update

- Responsive RTL home, island cards, bottom navigation, parent profile dialog and progress view.
- Arabic letters have a listen/learn/practice flow; the existing runner remains available from the lesson. Numbers and English coloring activities are preserved.
- 82 bundled MP3 clips cover 28 Arabic letters, their 28 example words, and 26 English letters. Letter playback uses these files first, without requiring an installed device voice. Other prompts use browser speech synthesis when available.
- Audio is canceled when switching letters, leaving an activity, muting, or hiding the page. Sound preferences and validated progress are stored locally. Signed-in progress syncs to Supabase when returning from an activity.
- Arabic typography is served with the app through Next.js font assets. Safe-area insets, dynamic viewport height, reduced motion, and 44px touch targets are supported.

### Verification

Production build: `npm run build`. Run the preview with `npm run start -- --port 3100`.

The Playwright smoke script at `scripts/smoke-mobile.mjs` checks 320×568, 390×844, 844×390, 768×1024 and 1440×900 viewports; audio playback, mute/replay, quiz correctness, profile and progress persistence, numbers and coloring completion, all 82 audio decodes, and runtime errors. Set `PLAYWRIGHT_MODULE` to an installed Playwright package and optionally `BROWSER_EXECUTABLE` to Chrome/Chromium, then run `node scripts/smoke-mobile.mjs`. `PREVIEW_URL` defaults to `http://localhost:3100`.

Changed application files pass ESLint. The full repository lint still reports pre-existing state-in-effect errors in the unused `AnimalsIslandAdventure.tsx`, along with existing login navigation warnings. These are outside the changed learning flows.

Screenshots are in `artifacts/mobile-home.png` and `artifacts/mobile-letter.png`. Browser tests emulate mobile sizes; physical iOS/Android testing and native app packaging remain separate steps. This is a responsive web application; no native binary or offline service worker is included.

### Narration assets

`public/audio/narration.json` records the spoken texts and their playback aliases. The recordings were generated locally with Microsoft Hoda (Arabic, Egypt) and Microsoft Zira (English, US). To regenerate on Windows, install Python with `pywin32`, FFmpeg, and those voices, then run `python scripts/generate-narration.py`. The script sends no text to a network service.
