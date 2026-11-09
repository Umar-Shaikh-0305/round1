import UmbrellaLogo from './UmbrellaLogo.jsx';
import { COMPETITION_NAME, ORGANIZATION } from '../config.js';

// Top bar for the Rounds page: logo on the left; rules book, leaderboard, welcome and logout on the right.
export default function TopBar({ user, onLogout, onRules, onBoard }) {
  return (
    <header className="topbar">
      <div className="topbar__brand">
        <UmbrellaLogo size={52} />
        <div className="topbar__title">
          <span className="topbar__org">{ORGANIZATION.toUpperCase()}</span>
          <span className="topbar__name">{COMPETITION_NAME.toUpperCase()}</span>
        </div>
      </div>
      <div className="topbar__user">
        <button type="button" className="navbtn" onClick={onRules}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5v14ZM4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5" />
          </svg>
          <span>Rules Book</span>
        </button>
        <button type="button" className="navbtn" onClick={onBoard}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4ZM7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3" />
          </svg>
          <span>Leaderboard</span>
        </button>
        <span className="topbar__welcome">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4 0-8 2-8 5v2h16v-2c0-3-4-5-8-5Z" />
          </svg>
          Welcome, <b>{user}</b>
        </span>
        <button type="button" className="logout" onClick={onLogout}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
          </svg>
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}
