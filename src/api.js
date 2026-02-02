import axios from 'axios';

const API = axios.create({
  // Use 127.0.0.1 to match your backend test
  baseURL: 'http://127.0.0.1:5000/api', 
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