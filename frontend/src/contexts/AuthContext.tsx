'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { login, refreshToken, verifyToken } from '@/services/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      verifyToken(token).then(isValid => {
        if (isValid) {
          setIsAuthenticated(true);
        } else {
          const refresh = localStorage.getItem('refresh_token');
          if (refresh) {
            refreshToken(refresh)
              .then(({ access }) => {
                localStorage.setItem('access_token', access);
                setIsAuthenticated(true);
              })
              .catch(() => logout());
          }
        }
      });
    }
  }, []);

  const handleLogin = async (username: string, password: string) => {
    const { access, refresh } = await login(username, password);
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login: handleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);