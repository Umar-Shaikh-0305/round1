import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Background from '../components/Background.jsx';
import UmbrellaLogo from '../components/UmbrellaLogo.jsx';
import TerminalButton from '../components/TerminalButton.jsx';
import { useAuth } from '../hooks/useAuth.jsx';
import { ORGANIZATION } from '../config.js';

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState(null); // { kind: 'ok' | 'error', text }

  if (user && !message) return <Navigate to="/rounds" replace />;

  function submit(e) {
    e.preventDefault();
    if (!username.trim() || !password) {
      setMessage({ kind: 'error', text: 'ENTER USERNAME AND PASSWORD' });
      return;
    }
    if (login(username, password)) {
      setMessage({ kind: 'ok', text: 'ACCESS GRANTED' });
      setTimeout(() => navigate('/rounds', { replace: true }), 900);
    } else {
      setMessage({ kind: 'error', text: 'ACCESS DENIED. INVALID CREDENTIALS' });
    }
  }

  return (
    <Background variant="login">
      <main className="login">
        <UmbrellaLogo size={96} className="login__logo" />
        <div className="login__org">
          <span />
          <p>{ORGANIZATION.toUpperCase()}</p>
          <span />
        </div>
        <h1 className="login__title">
          CLASSIFIED F<i>I</i>LES
        </h1>
        <div className="login__sub">
          <span />
          <p>
            <em>ONLINE</em> COMPETITION
          </p>
          <span />
        </div>
        <p className="login__motto">DECODE · SOLVE · SURVIVE</p>

        <div className="frame-wrap login__panelwrap">
          <form className="frame login__panel" onSubmit={submit} noValidate>
            <label className="field">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4 0-8 2-8 5v2h16v-2c0-3-4-5-8-5Z" />
              </svg>
              <input
                type="text"
                placeholder="Enter Username"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <label className="field">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5Zm-3 8V7a3 3 0 1 1 6 0v3H9Z" />
              </svg>
              <input
                type={show ? 'text' : 'password'}
                placeholder="Enter Password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="field__eye"
                onClick={() => setShow((s) => !s)}
                aria-label={show ? 'Hide password' : 'Show password'}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12Z" />
                  <circle cx="12" cy="12" r="3" />
                  {!show && <path d="M3 3l18 18" />}
                </svg>
              </button>
            </label>

            <div className={`banner banner--${message?.kind || 'idle'}`} role="status" aria-live="polite">
              {message?.text || ' '}
            </div>

            <TerminalButton type="submit" variant="primary" className="login__submit">
              ENTER FACILITY
            </TerminalButton>
            {import.meta.env.DEV && (
              <p className="login__hint">Demo login: agent01 / umbrella01</p>
            )}
          </form>
        </div>
      </main>
    </Background>
  );
}
