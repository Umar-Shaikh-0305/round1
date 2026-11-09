import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Background from '../components/Background.jsx';
import TopBar from '../components/TopBar.jsx';
import RulesBook from '../components/RulesBook.jsx';
import Leaderboard from '../components/Leaderboard.jsx';
import RoundCard from '../components/RoundCard.jsx';
import UmbrellaLogo from '../components/UmbrellaLogo.jsx';
import useNow from '../hooks/useNow.js';
import { useAuth } from '../hooks/useAuth.jsx';
import { getProgress, getSchedule, roundEndsAt, roundState } from '../lib/rounds.js';
import { ORGANIZATION, ROUND_DURATION_MIN } from '../config.js';

export default function Rounds() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const now = useNow(1000);
  const [panel, setPanel] = useState(null); // 'rules' | 'board' | null
  const closePanel = useCallback(() => setPanel(null), []);
  const schedule = getSchedule();
  const progress = getProgress(user);

  function cardProps(n) {
    const state = roundState(n, schedule, progress, now);
    let secondsLeft;
    let ring;
    if (state === 'active') {
      secondsLeft = (roundEndsAt(progress, n) - now) / 1000;
      ring = secondsLeft / (ROUND_DURATION_MIN[n] * 60);
    } else {
      secondsLeft = Math.max(0, (schedule.start[n] - now) / 1000);
      const span = Math.max(1, (schedule.start[n] - schedule.armedAt) / 1000);
      ring = secondsLeft / span;
    }
    return { state, secondsLeft, progress: ring, score: progress[n]?.score ?? null };
  }

  function start(n, state) {
    if (state === 'open' || state === 'active') navigate(`/rules/${n}`);
  }

  const r1 = cardProps(1);
  const r2 = cardProps(2);

  return (
    <Background variant="rounds">
      <div className="page">
        <TopBar user={user} onLogout={logout} onRules={() => setPanel('rules')} onBoard={() => setPanel('board')} />
        {panel === 'rules' && <RulesBook onClose={closePanel} />}
        {panel === 'board' && (
          <Leaderboard
            me={user}
            myR1={progress[1]?.score ?? null}
            myR2={progress[2]?.score ?? null}
            onClose={closePanel}
          />
        )}
        <main className="rounds">
          <div className="heading">
            <span />
            <h2>COMPETITION ROUNDS</h2>
            <span />
          </div>
          <p className="rounds__sub">CHOOSE YOUR MISSION</p>

          <section className="rounds__grid">
            <RoundCard round={1} {...r1} onStart={() => start(1, r1.state)} />
            <RoundCard round={2} {...r2} onStart={() => start(2, r2.state)} />
          </section>
        </main>

        <footer className="strip">
          <UmbrellaLogo size={34} />
          <p>“SURVIVE. SOLVE. COMPLETE.”</p>
          <span className="strip__org">
            <i>///</i> {ORGANIZATION.toUpperCase()}
          </span>
        </footer>
      </div>
    </Background>
  );
}
