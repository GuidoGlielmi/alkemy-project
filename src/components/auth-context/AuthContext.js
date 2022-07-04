import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const authContext = createContext('');
export const api = axios.create({ baseURL: 'https://goscrum-api.alkemy.org' });
let interceptorToken = '';
api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${interceptorToken || ''}`;
  return config;
});

function clearStorage(values) {
  Object.entries(values).forEach(([key, value]) =>
    value ? localStorage.setItem(key, value) : localStorage.removeItem(key),
  );
}

export default function AuthContext({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
  const [password, setPassword] = useState(localStorage.getItem('password') || '');

  useEffect(() => {
    clearStorage({ token, userName, password });
  });

  useEffect(() => {
    interceptorToken = token;
  }, [token]);

  function clearLogin() {
    setToken();
    setUserName();
    setPassword();
  }

  return (
    <authContext.Provider
      value={{ token, setToken, userName, setUserName, password, setPassword, clearLogin }}
    >
      {children}
    </authContext.Provider>
  );
}
