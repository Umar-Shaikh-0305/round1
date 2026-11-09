import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Background from '../components/Background.jsx';
import TerminalButton from '../components/TerminalButton.jsx';
import UmbrellaLogo from '../components/UmbrellaLogo.jsx';
import useNow from '../hooks/useNow.js';
import { useAuth } from '../hooks/useAuth.jsx';
import { beginRound, getProgress, getSchedule, roundState } from '../lib/rounds.js';
import { QUESTION_SECONDS, ROUNDS, ROUND_DURATION_MIN } from '../config.js';

// Rules shown for ONE round only. Edit the text here.
const RULES = {
  1: {
    items: [
      `You have ${ROUND_DURATION_MIN[1]} minutes for the whole round. The timer is shown at the top right.`,
      'Every team starts at x = 0. Open drawers, cupboards, chests and coffins to find cards.',
      `Each card shows a piece of code that changes x. You have ${QUESTION_SECONDS} seconds per card to take it or drop it.`,
      'Take the card to apply it, or drop it to skip it. If the card timer runs out you lose 3 points (x − 3).',
      'The goal is to get x as close to 31 as possible.',
      'Going over 31 balances the score back to 31 and then takes 5 off, so the score becomes 26.',
      'The ghost appears without warning. Looking into her eyes for a full second is a bust (x − 3).',
      'When the round timer reaches 0 the round locks. Any card that has not been submitted is discarded and does not count.',
    ],
    controls: [
      ['W A S D', 'Move'],
      ['Mouse', 'Look around'],
      ['Shift', 'Run'],
      ['Space', 'Jump'],
      ['E', 'Open / close, take card'],
      ['C', 'Grab the card inside'],
      ['Q', 'Drop the card'],
      ['F', 'Flashlight'],
      ['Esc', 'Pause'],
    ],
  },
  2: {
    items: ['The rules for this round will be added here once they are confirmed by the organizers.'],
    controls: [],
  },
};

export default function Rules() {
  const { round } = useParams();
  const n = Number(round);
  const { user } = useAuth();
  const navigate = useNavigate();
  const now = useNow(1000);

  if (n !== 1 && n !== 2) return <Navigate to="/rounds" replace />;

  const state = roundState(n, getSchedule(), getProgress(user), now);
  if (state !== 'open' && state !== 'active') return <Navigate to="/rounds" replace />;

  const rules = RULES[n];

  function proceed() {
    beginRound(user, n);
    navigate(`/round/${n}`);
  }

  return (
    <Background variant="rules">
      <div className="page page--narrow">
        <header className="rules__head">
          <UmbrellaLogo size={44} />
          <div>
            <p className="rules__org">UMBRELLA CORPORATION · CLASSIFIED FILES</p>
            <h2 className="rules__title">{ROUNDS[n].label} · RULES AND CONDITIONS</h2>
          </div>
        </header>

        <div className="frame-wrap">
          <div className="frame rules__panel">
            <section className="rules__block is-current">
              <ol>
                {rules.items.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ol>
              {rules.controls.length > 0 && (
                <dl className="controls">
                  {rules.controls.map(([k, v]) => (
                    <div key={k}>
                      <dt>{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </section>
          </div>
        </div>

        <p className="rules__warn">⚠ The round timer starts the moment you press Continue.</p>

        <div className="rules__actions">
          <TerminalButton variant="ghost" onClick={() => navigate('/rounds')}>
            BACK
          </TerminalButton>
          <TerminalButton variant="primary" onClick={proceed}>
            CONTINUE
          </TerminalButton>
        </div>
      </div>
    </Background>
  );
}
