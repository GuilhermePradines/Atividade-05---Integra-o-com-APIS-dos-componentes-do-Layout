// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/', // substitua pelo IP da sua máquina
  timeout: 5000,
});

export default api;
