// ------------------------------------------------------------------
// Central settings. Everything the organizers may want to change lives here.
// There is no backend: accounts, schedule and progress are all local.
// ------------------------------------------------------------------

export const COMPETITION_NAME = 'Classified Files';
export const ORGANIZATION = 'Umbrella Corporation';

// Length of each round, in minutes.
export const ROUND_DURATION_MIN = { 1: 60, 2: 60 };

// Round timer colours: yellow when this many seconds are left, red when fewer.
export const WARN_AT_SEC = 5 * 60;
export const DANGER_AT_SEC = 60;

// The 10-second per-question timer is built into the Code 21 game (Round 1).
export const QUESTION_SECONDS = 10;

// ---- Round start times -------------------------------------------
// Put real ISO date-times here when they are known, e.g. '2026-11-20T10:00:00+05:00'.
// While a value is null, a demo countdown is used instead (see DEMO_DELAY_SEC).
export const REAL_START_TIMES = { 1: null, 2: null };

// Demo countdowns (seconds after the page is first opened in this browser).
export const DEMO_DELAY_SEC = { 1: 20, 2: 150 };

// ---- Mock accounts (no backend) -----------------------------------
export const ACCOUNTS = [
  { username: 'agent01', password: 'umbrella01' },
  { username: 'agent02', password: 'umbrella02' },
  { username: 'agent03', password: 'umbrella03' },
  { username: 'admin', password: 'umbrella' },
];

// Sample teams for the leaderboard (no backend yet). Replace with real data later.
export const MOCK_TEAMS = [
  { name: 'agent04', r1: 29, r2: null },
  { name: 'agent05', r1: 28, r2: null },
  { name: 'agent06', r1: 26, r2: null },
  { name: 'agent07', r1: 24, r2: null },
];

export const ROUNDS = {
  1: { label: 'ROUND 1', tagline: 'THE OUTBREAK BEGINS' },
  2: { label: 'ROUND 2', tagline: 'THE FINAL CHALLENGE' },
};

// Where the Round 1 game lives (served from /public/game).
export const ROUND1_GAME_URL = '/game/index.html';
