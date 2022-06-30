import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
export const authContext = createContext('');
export const api = axios.create({ baseURL: 'https://goscrum-api.alkemy.org' });
let interceptorToken = '';
api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${interceptorToken || ''}`;
  return config;
});
export default function AuthContext({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  useEffect(() => {
    interceptorToken = token;
    token ? localStorage.setItem('token', token) : localStorage.removeItem('token');
  }, [token]);
  return <authContext.Provider value={{ token, setToken }}>{children}</authContext.Provider>;
}
