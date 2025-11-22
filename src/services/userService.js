// ============================================
// MOCKS - REMOVER APÓS INTEGRAÇÃO
// ============================================
// Para remover os mocks: delete a linha de import abaixo
import { getMockUsers, getMockUserById } from '../mocks/users';

const API_URL = 'http://localhost:8000/api';
const USE_MOCKS = true; // Mude para false quando integrar com backend real

export const getAllUsers = async () => {
  // ============================================
  // MOCKS - REMOVER APÓS INTEGRAÇÃO
  // ============================================
  if (USE_MOCKS) {
    console.log('📦 Usando dados mockados de usuários');
    return getMockUsers();
  }
  // ============================================

  try {
    const response = await fetch(`${API_URL}/users`);
    if (response.ok) {
      return await response.json();
    }
    console.error('Erro ao buscar usuários:', await response.json());
    return [];
  } catch (error) {
    console.error('Erro de conexão ao buscar usuários:', error);
    return [];
  }
};

export const getUserById = async (userId) => {
  // ============================================
  // MOCKS - REMOVER APÓS INTEGRAÇÃO
  // ============================================
  if (USE_MOCKS) {
    console.log('📦 Usando dados mockados de usuário:', userId);
    return getMockUserById(userId);
  }
  // ============================================

  try {
    const response = await fetch(`${API_URL}/users/${userId}`);
    if (response.ok) {
      return await response.json();
    }
    console.error('Erro ao buscar usuário:', await response.json());
    return null;
  } catch (error) {
    console.error('Erro de conexão ao buscar usuário:', error);
    return null;
  }
};

