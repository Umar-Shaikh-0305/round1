import { useCallback, useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import UmbrellaLogo from '../components/UmbrellaLogo.jsx';
import TerminalButton from '../components/TerminalButton.jsx';
import { useAuth } from '../hooks/useAuth.jsx';
import useNow from '../hooks/useNow.js';
import { getProgress, roundEndsAt, scoreFromX, updateRound } from '../lib/rounds.js';
import { formatMS } from '../lib/time.js';
import {
  COMPETITION_NAME,
  DANGER_AT_SEC,
  ORGANIZATION,
  ROUND1_GAME_URL,
  ROUNDS,
  WARN_AT_SEC,
} from '../config.js';

function timerTone(secondsLeft) {
  if (secondsLeft <= DANGER_AT_SEC) return 'danger';
  if (secondsLeft <= WARN_AT_SEC) return 'warn';
  return 'ok';
}

export default function RoundPlay() {
  const { round } = useParams();
  const n = Number(round);
  const { user } = useAuth();
  const navigate = useNavigate();
  const now = useNow(250);
  const frameRef = useRef(null);
  const lastSeen = useRef({ x: 0, busts: 0 });
  const [result, setResult] = useState(null); // { reason: 'timeout' | 'game', x, busts, score }

  const progress = getProgress(user);
  const p = progress[n];
  const endsAt = roundEndsAt(progress, n);

  // Read the live game state (same-origin iframe). Returns null until the game has loaded.
  const readGame = useCallback(() => {
    try {
      const g = frameRef.current?.contentWindow?.__game;
      if (!g) return null;
      return { x: g.S.x, busts: g.S.busts, mode: g.S.mode, game: g };
    } catch {
      return null;
    }
  }, []);

  const finish = useCallback(
    (reason) => {
      if (result) return;
      const live = readGame();
      const snap = live ? { x: live.x, busts: live.busts } : lastSeen.current;
      try {
        live?.game.controls.unlock();
      } catch {
        /* ignore */
      }
      // Only cards that were already taken or dropped are counted. A card still
      // open on screen when time ends was never applied to x, so it is discarded.
      const score = scoreFromX(snap.x);
      updateRound(user, n, { status: 'done', x: snap.x, busts: snap.busts, score, finishedAt: Date.now(), reason });
      setResult({ reason, ...snap, score });
    },
    [result, readGame, user, n],
  );

  // Poll the game for its current values and for the end-of-game screen.
  useEffect(() => {
    if (n !== 1 || result) return undefined;
    const id = setInterval(() => {
      const live = readGame();
      if (!live) return;
      lastSeen.current = { x: live.x, busts: live.busts };
      if (live.mode === 'over') finish('game');
    }, 500);
    return () => clearInterval(id);
  }, [n, result, readGame, finish]);

  const secondsLeft = endsAt ? Math.max(0, (endsAt - now) / 1000) : 0;

  // Round timer reached 0: lock the round.
  useEffect(() => {
    if (endsAt && !result && secondsLeft <= 0) finish('timeout');
  }, [endsAt, secondsLeft, result, finish]);

  if ((n !== 1 && n !== 2) || !p?.startedAt) return <Navigate to="/rounds" replace />;

  // Already finished earlier (e.g. user came back via the URL): nothing to play.
  if (!result && p.status === 'done') return <Navigate to="/rounds" replace />;

  const tone = timerTone(secondsLeft);
  const locked = !!result;

  return (
    <div className="play">
      <header className="roundbar">
        <div className="roundbar__left">
          <span className="roundbar__round">{ROUNDS[n].label}</span>
        </div>
        <div className="roundbar__center">
          <UmbrellaLogo size={30} />
          <div>
            <span className="roundbar__org">{ORGANIZATION.toUpperCase()}</span>
            <span className="roundbar__name">{COMPETITION_NAME.toUpperCase()}</span>
          </div>
        </div>
        <div className="roundbar__right">
          <div className={`rtimer rtimer--${locked ? 'locked' : tone}`} aria-label="Round time remaining">
            <span className="rtimer__label">TIME</span>
            <span className="rtimer__value">{formatMS(secondsLeft)}</span>
          </div>
        </div>
      </header>

      <div className="play__stage">
        {n === 1 && !locked && (
          <iframe
            ref={frameRef}
            title="Round 1: Code 21, The Mansion"
            className="play__frame"
            src={ROUND1_GAME_URL}
            allow="autoplay; fullscreen; pointer-lock"
          />
        )}

        {n === 2 && !locked && (
          <div className="play__pending frame-wrap">
            <div className="frame">
              <h2>ROUND 2</h2>
              <p>The Round 2 mission content will be added in the next part.</p>
              <p className="muted">The round timer above is already running.</p>
              <TerminalButton variant="ghost" onClick={() => navigate('/rounds')}>
                BACK TO ROUNDS
              </TerminalButton>
            </div>
          </div>
        )}

        {locked && (
          <div className="lockscreen">
            <div className="frame-wrap">
              <div className={`frame lockscreen__panel lockscreen__panel--${result.reason}`}>
                {result.reason === 'timeout' ? (
                  <>
                    <h2 className="stamp stamp--red">SYSTEM LOCKED</h2>
                    <p>Time is up. {ROUNDS[n].label} is now closed.</p>
                    <p className="muted">Any card that was not submitted has been discarded.</p>
                  </>
                ) : (
                  <>
                    <h2 className="stamp stamp--gold">MISSION COMPLETED</h2>
                    <p>{ROUNDS[n].label} has been submitted.</p>
                  </>
                )}
                {n === 1 && (
                  <dl className="lockscreen__stats">
                    <div>
                      <dt>FINAL x</dt>
                      <dd>{result.x}</dd>
                    </div>
                    <div>
                      <dt>BUSTS</dt>
                      <dd>{result.busts}</dd>
                    </div>
                    <div>
                      <dt>SCORE</dt>
                      <dd>{result.score}</dd>
                    </div>
                  </dl>
                )}
                <TerminalButton variant="primary" onClick={() => navigate('/rounds', { replace: true })}>
                  RETURN TO ROUNDS
                </TerminalButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
