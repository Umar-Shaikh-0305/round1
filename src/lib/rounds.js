import { DEMO_DELAY_SEC, REAL_START_TIMES, ROUND_DURATION_MIN } from '../config.js';
import { readJSON, writeJSON } from './storage.js';

const SCHEDULE_KEY = 'cf_schedule_v1';
const progressKey = (user) => `cf_progress_v1_${user}`;

// ---- Schedule ------------------------------------------------------
// start[n] is the moment (ms) that round n becomes available.
export function getSchedule() {
  let saved = readJSON(SCHEDULE_KEY, null);
  if (!saved) {
    const armedAt = Date.now();
    saved = {
      armedAt,
      start: {
        1: armedAt + DEMO_DELAY_SEC[1] * 1000,
        2: armedAt + DEMO_DELAY_SEC[2] * 1000,
      },
    };
    writeJSON(SCHEDULE_KEY, saved);
  }
  const start = { ...saved.start };
  for (const n of [1, 2]) {
    if (REAL_START_TIMES[n]) start[n] = Date.parse(REAL_START_TIMES[n]);
  }
  return { armedAt: saved.armedAt, start };
}

// ---- Progress (per participant) -----------------------------------
export function getProgress(user) {
  return readJSON(progressKey(user), {});
}

export function updateRound(user, round, patch) {
  const all = getProgress(user);
  all[round] = { ...(all[round] || {}), ...patch };
  writeJSON(progressKey(user), all);
  return all;
}

export function beginRound(user, round) {
  const all = getProgress(user);
  if (!all[round] || !all[round].startedAt) {
    return updateRound(user, round, { status: 'active', startedAt: Date.now() });
  }
  return all;
}

export function roundEndsAt(progress, round) {
  const p = progress[round];
  if (!p || !p.startedAt) return null;
  return p.startedAt + ROUND_DURATION_MIN[round] * 60 * 1000;
}

// 'locked'    countdown still running
// 'blocked'   countdown finished but an earlier round is not completed yet
// 'open'      ready to start
// 'active'    started, time still left
// 'completed' finished or time ran out
export function roundState(round, schedule, progress, now) {
  const p = progress[round];
  if (p?.status === 'done') return 'completed';
  if (p?.startedAt) {
    return now >= roundEndsAt(progress, round) ? 'completed' : 'active';
  }
  if (schedule.start[round] - now > 0) return 'locked';
  if (round === 2 && !isRoundFinished(progress, 1, now)) return 'blocked';
  return 'open';
}

export function isRoundFinished(progress, round, now) {
  const p = progress[round];
  if (!p) return false;
  if (p.status === 'done') return true;
  return !!p.startedAt && now >= roundEndsAt(progress, round);
}

// Game rule: over 31 is balanced back to 31 and then 5 is taken off.
export function scoreFromX(x) {
  return x > 31 ? 31 - 5 : x;
}
