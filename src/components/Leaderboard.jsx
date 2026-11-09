import Modal from './Modal.jsx';
import { MOCK_TEAMS } from '../config.js';

// rows: [{ name, r1, r2 }]. The signed-in participant is merged in by the caller.
export default function Leaderboard({ me, myR1, myR2, onClose }) {
  const rows = [
    ...MOCK_TEAMS.map((t) => ({ ...t, you: false })),
    { name: me, r1: myR1, r2: myR2, you: true },
  ]
    .map((r) => ({ ...r, total: (r.r1 ?? 0) + (r.r2 ?? 0) }))
    .sort((a, b) => b.total - a.total || a.name.localeCompare(b.name));

  const medal = (i) => (i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1);

  return (
    <Modal title="LEADERBOARD" subtitle="SCOREBOARD" onClose={onClose}>
      <div className="board__scroll">
        <table className="board">
          <thead>
            <tr>
              <th>RANK</th>
              <th>TEAM</th>
              <th>ROUND 1</th>
              <th>ROUND 2</th>
              <th>TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.name} className={r.you ? 'is-you' : ''}>
                <td>{medal(i)}</td>
                <td>
                  {r.name}
                  {r.you && <em>YOU</em>}
                </td>
                <td>{r.r1 ?? '-'}</td>
                <td>{r.r2 ?? '-'}</td>
                <td className="board__total">{r.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="board__note">Provisional standings. Other teams shown here are sample data until real results are connected.</p>
    </Modal>
  );
}
