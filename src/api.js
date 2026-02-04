import axios from 'axios';

const API = axios.create({
  // Use Vite proxy to avoid CORS during development
  baseURL: '/api',
});

// Automatically add the Token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;