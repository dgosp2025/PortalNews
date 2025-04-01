import { API_AUTH_URL } from '@/config';

export const login = async (username: string, password: string) => {
  const response = await fetch(`${API_AUTH_URL}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return await response.json();
};

export const refreshToken = async (refresh: string) => {
  const response = await fetch(`${API_AUTH_URL}/refresh/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh }),
  });

  if (!response.ok) {
    throw new Error('Failed to refresh token');
  }

  return await response.json();
};

export const verifyToken = async (token: string) => {
  const response = await fetch(`${API_AUTH_URL}/verify/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  });

  return response.ok;
};