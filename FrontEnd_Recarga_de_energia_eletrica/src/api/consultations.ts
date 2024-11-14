import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:3000/api';

// Criar uma instância do axios com configurações base
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar o token em todas as requisições
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('userToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getUserData = async (username: string) => {
  try {
    const response = await api.post('/auth/get-user', { username });
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Erro ao buscar dados do usuário';
    throw new Error(errorMessage);
  }
};

export const createConsultation = async (consultationData: any) => {
  try {
    const response = await api.post('/consultations', consultationData);
    return response.data;
  } catch (error: any) {
    console.error('Erro na resposta:', error.response?.data);
    const errorMessage = error.response?.data?.message || 'Erro ao criar consulta';
    throw new Error(errorMessage);
  }
};

export const getConsultations = async () => {
  try {
    const username = await AsyncStorage.getItem('username');
    if (!username) {
      throw new Error('Usuário não autenticado');
    }

    const response = await api.get(`/consultations`, {
      params: { username }
    });
    return response.data;
  } catch (error: any) {
    console.error('Erro ao buscar consultas:', error);
    const errorMessage = error.response?.data?.message || 'Erro ao buscar consultas';
    throw new Error(errorMessage);
  }
}; 