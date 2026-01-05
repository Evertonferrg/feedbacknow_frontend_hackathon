import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // URL do seu backend Spring Boot
  withCredentials: true
});

// Função para buscar os feedbacks do banco de dados
export const getFeedbacks = () => api.get('/sentiments');

export default api;