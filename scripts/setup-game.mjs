// Downloads the Code 21 3D assets (about 108 MB) into public/game/assets.
// Needs git and an internet connection. Run once: npm run setup-game
import { execSync } from 'node:child_process';
import { cpSync, existsSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const target = join('public', 'game', 'assets');
if (existsSync(join(target, 'models'))) {
  console.log('Game assets already present. Nothing to do.');
  process.exit(0);
}
const tmp = mkdtempSync(join(tmpdir(), 'code21-'));
try {
  console.log('Downloading game assets...');
  execSync(`git clone --depth 1 https://github.com/tahaanwar31/DSA-Competition-.git "${tmp}"`, { stdio: 'inherit' });
  cpSync(join(tmp, 'assets'), target, { recursive: true });
  console.log('Done. Game assets are in', target);
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
