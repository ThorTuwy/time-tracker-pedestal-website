# Repository Guidance

- This is a Preact/Vite website intended to display time-tracking data on an ESP32. Keep the browser bundle and runtime lightweight; the current app uses hardcoded sample activities and has no established firmware API contract.
- `src/main.tsx` mounts `src/app.tsx`; reusable schedule rendering is in `src/components/WeekCalender.tsx`. Its `ActivityTrackRecord` values use weekday names and start/stop minutes from midnight.
- Use pnpm (the repository has `pnpm-lock.yaml`). Run `pnpm dev` for local development, `pnpm run build` for the production build, and `pnpm preview` to serve that build locally.
- `pnpm run build` runs `tsc -b` before `vite build`; this is the available verification command. There are currently no test or lint scripts.
- Vite writes static output to `dist/` and the compression plugin generates Brotli sidecars there; `dist/` is generated and git-ignored.
