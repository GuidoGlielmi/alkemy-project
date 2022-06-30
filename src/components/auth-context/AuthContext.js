import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
export const authContext = createContext('');
export const api = axios.create({ baseURL: 'https://goscrum-api.alkemy.org' });

export default function AuthContext({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  api.interceptors.request.use((config) => {
    config.headers.Authorization = token;
    return config;
  });
  useEffect(() => {
    const newToken = `Bearer ${token}`;
    api.interceptors.request.use((config) => {
      config.headers.Authorization = newToken;
      return config;
    });
    localStorage.setItem('token', newToken);
  }, [token]);
  return <authContext.Provider value={{ token, setToken }}>{children}</authContext.Provider>;
}
