import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { checkLogin, clearSavedUser, getSavedUser } from '../lib/auth.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getSavedUser());

  const login = useCallback((username, password) => {
    const name = checkLogin(username, password);
    if (name) setUser(name);
    return !!name;
  }, []);

  const logout = useCallback(() => {
    clearSavedUser();
    setUser(null);
  }, []);

  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
