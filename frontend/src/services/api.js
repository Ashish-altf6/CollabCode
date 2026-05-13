import axios from 'axios';

let baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// Safety check: if URL is from Render and missing /api, add it automatically
if (baseURL && baseURL.includes('onrender.com') && !baseURL.endsWith('/api')) {
  baseURL = baseURL.endsWith('/') ? `${baseURL}api` : `${baseURL}/api`;
}

const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

export default api;
