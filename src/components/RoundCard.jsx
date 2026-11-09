import CountdownRing from './CountdownRing.jsx';
import TerminalButton from './TerminalButton.jsx';
import { ROUNDS, ROUND_DURATION_MIN } from '../config.js';

// What each state shows. dot: grey | red | green | gold
function describe(round, state, ctx) {
  switch (state) {
    case 'locked':
      return {
        dot: 'grey',
        status: 'LOCKED',
        note: round === 2 ? 'Unlocks when timer reaches 0 and Round 1 is complete' : 'Unlocks when timer reaches 0',
        button: { variant: 'locked', text: `ROUND ${round} LOCKED` },
        tone: round === 1 ? 'red' : 'grey',
      };
    case 'blocked':
      return {
        dot: 'red',
        status: 'LOCKED',
        note: 'Complete Round 1 to unlock',
        button: { variant: 'locked', text: `ROUND ${round} LOCKED` },
        tone: 'grey',
      };
    case 'open':
      return {
        dot: 'green',
        status: 'ACCESS GRANTED',
        note: 'The facility is open. Begin when ready.',
        button: { variant: 'primary', text: `START ROUND ${round}` },
        tone: 'green',
      };
    case 'active':
      return {
        dot: 'green',
        status: 'IN PROGRESS',
        note: 'Your mission is under way.',
        button: { variant: 'primary', text: `RESUME ROUND ${round}` },
        tone: 'red',
      };
    default:
      return {
        dot: 'gold',
        status: 'MISSION COMPLETED',
        note: ctx.score != null ? `Final score: ${ctx.score}` : 'This round is closed.',
        button: { variant: 'locked', text: `ROUND ${round} CLOSED` },
        tone: 'gold',
      };
  }
}

export default function RoundCard({ round, state, secondsLeft, progress, score, onStart }) {
  const info = ROUNDS[round];
  const d = describe(round, state, { score });
  const label = state === 'active' ? 'ROUND TIME LEFT' : state === 'completed' ? 'ROUND CLOSED' : 'TIME REMAINING';
  const ringSeconds = state === 'completed' ? 0 : secondsLeft;
  const ringProgress = state === 'open' ? 1 : state === 'completed' ? 0 : progress;

  return (
    <article className={`rcard rcard--${state} ${round === 1 ? 'rcard--hot' : ''}`}>
      <div className="rcard__frame">
        <div className="rcard__tag">
          <span>{info.label}</span>
        </div>
        <p className="rcard__tagline">{info.tagline}</p>

        <div className="rcard__body">
          <CountdownRing seconds={ringSeconds} progress={ringProgress} tone={d.tone} label={label} />
          <div className="rcard__divider" />
          <div className="rcard__status">
            <span className="rcard__statuslabel">
              <i className={`dot dot--${d.dot}`} /> STATUS
            </span>
            <strong className="rcard__statusvalue">{d.status}</strong>
            <p className="rcard__note">{d.note}</p>
            <p className="rcard__meta">{ROUND_DURATION_MIN[round]} min round</p>
          </div>
        </div>

        <TerminalButton variant={d.button.variant} onClick={onStart}>
          {d.button.text}
        </TerminalButton>
      </div>
    </article>
  );
}
