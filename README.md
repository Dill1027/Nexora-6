# Happy Hearts mobile app

An Expo + React Native parent app for Happy Hearts Childcare Center, based on the supplied Nexora-6 business plan and logo. Runs on Android, iOS, and web.

## Run

Use Node.js 22.13+.

```sh
npm install
npm start
```

Scan the QR code with a compatible Expo Go version, or press `a` for an Android emulator / `i` for an iOS simulator (requires Xcode on macOS). `npm run web` opens the browser preview.

```sh
npm run typecheck
npx expo export --platform web
```

## Included

- Parent dashboard, child status, check-in time, mood and pickup summary.
- Illustrative school-to-centre journey and contact action.
- Daily activities and attendance tabs.
- Demo messaging with in-session message history.
- Editable in-session child name and service pricing from the business plan.
- Booking preview with date validation and notification sheet.
- Supplied brand image and centre contact details.

## Demo boundaries

All child names, staff names, attendance, activities and journey records are fictional sample data. Messages, profile edits and booking previews exist only in memory and reset when the app reloads. No messages or bookings are submitted. The route is an illustration, not a live map. Telephone and email buttons open the device apps using the contact information in the business plan.

Before real use, connect authenticated parent/staff accounts, authorized child records, persistent storage, vehicle GPS, push notifications and a server for messages and bookings. No CCTV or payment processing is implemented. No native device build or store release is included.

## Deploy to Vercel

The repository includes `vercel.json` for the Expo web build, `dist` output and single-page routing. Vercel uses Node.js 22.x from `package.json`.

```sh
npx vercel login
npx vercel --prod
```

Alternatively, import this repository into Vercel and deploy. The checked-in configuration supplies the build settings. This publishes the browser version; Android/iOS binaries are separate builds.
