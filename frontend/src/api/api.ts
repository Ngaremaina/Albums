import axios from 'axios';
const baseURL = import.meta.env.VITE_BASE_URL || 'https://albums-ickh.onrender.com';

const axiosInstance = axios.create({
  baseURL,  
  timeout: 1000,                             
  headers: {
    'Content-Type': 'application/json', 
  },
});

export default axiosInstance;
