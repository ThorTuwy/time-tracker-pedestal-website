# Repository Guidance

- This is a Preact/TypeScript website built with Vite for displaying time-tracking data on an ESP32-connected pedestal. Keep the client and browser bundle lightweight.
- `src/main.tsx` mounts `src/app.tsx`. `src/components/WeekCalender.tsx` renders the weekly schedule, and `src/components/ActivitySummary.tsx` shows totals and lets users edit activity names and colors.
- The app loads `history.bin` and `names.bin` from the site base URL. In development, Vite serves these files from `dev_public/`; production hosting or firmware must provide the corresponding resources. Saving posts serialized activity-name records as `application/octet-stream` to `api/replaceRegister`. The server/firmware implementation is not in this repository.
- Binary layout is shared with the data producer: history records are 20 bytes (`uint32` activity ID plus two `uint64` Unix timestamps), and name records are 39 bytes (`uint32` ID, 32 UTF-8 name bytes, and three RGB bytes). Numeric fields are little-endian. Keep parser and serializer changes aligned with the producer/firmware contract.
- Schedule records use JavaScript `Date` values; the calendar groups them by local weekday and displays Monday through Sunday. Activity totals are calculated for the current week and month in `src/utils/record-parser.ts`.
- Use pnpm (the repository has `pnpm-lock.yaml`). Run `pnpm dev` for local development, `pnpm run build` for the production build, and `pnpm preview` to serve that build locally.
- `pnpm run build` runs `tsc -b` before `vite build`; this is the available verification command. There are currently no test or lint scripts.
- Vite writes output to the git-ignored `dist/` directory. The compression plugin uses gzip and deletes the uncompressed build assets; it does not generate Brotli sidecars.
