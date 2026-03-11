/// Centralizar a configuração do Axios

import axios from 'axios';

/// Substituir pela URL verdadeira
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;