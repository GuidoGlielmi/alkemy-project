import axios from 'axios';

const api = axios.create({baseURL: 'https://goscrum-api.alkemy.org'});
let interceptorToken = '';
api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${interceptorToken || ''}`;
  return config;
});

export const setToken = (token) => (interceptorToken = token);

export default api;
