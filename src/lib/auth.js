import { ACCOUNTS } from '../config.js';
import { readJSON, writeJSON, removeKey } from './storage.js';

const KEY = 'cf_user_v1';

export function getSavedUser() {
  return readJSON(KEY, null);
}

// Mock login: checks the typed credentials against config.js. Returns the username or null.
export function checkLogin(username, password) {
  const u = username.trim().toLowerCase();
  const match = ACCOUNTS.find((a) => a.username === u && a.password === password);
  if (!match) return null;
  writeJSON(KEY, match.username);
  return match.username;
}

export function clearSavedUser() {
  removeKey(KEY);
}
