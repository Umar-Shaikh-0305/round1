# Umbrella Corporation: Classified Files (front end only)

React + Vite + JavaScript + CSS. No backend: accounts, round schedule and progress are local (localStorage).

## Run
    npm install
    npm run setup-game   (once: downloads the 3D game assets, needs git + internet)
    npm run dev

Demo login: `agent01` / `umbrella01` (more accounts in `src/config.js`).

## Where to change things
- `src/config.js`: accounts, round start times (`REAL_START_TIMES`), demo countdowns, round length, timer warning thresholds.
- `src/styles/theme.css`: the colour palette (CSS variables).
- `public/bg/`: drop `login.jpg`, `rounds.jpg`, `rules.jpg` background photos here.
- `public/game/`: the Code 21 game (Round 1), shown inside the Round 1 page. Three.js is bundled locally (public/game/vendor), so only the assets download is needed. The game takes ~15 s to load, then click anywhere to enter.

## Flow
Login -> Rounds -> Rules (`/rules/:n`) -> Round (`/round/:n`).
Reset demo data: clear this site's localStorage in the browser.
