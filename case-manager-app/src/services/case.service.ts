// src/services/case.service.ts

import Cookies from 'js-cookie'; 
import type { Case, CaseInput, ApiError } from '@/types';

const API_BASE_URL = "http://localhost:3001/api";

const getAuthHeaders = () => {
  const token = Cookies.get('jwt-token');
  if (!token) {
    throw new Error('No se encontró el token de autenticación');
  }
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

const handleError = async (response: Response) => {
  const errorData: ApiError = await response.json();
  throw new Error(errorData.message || 'Error desconocido');
};

export const getAllCases = async (): Promise<Case[]> => {
  const response = await fetch(`${API_BASE_URL}/cases`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    return handleError(response);
  }
  return response.json();
};

export const createCase = async (caseData: CaseInput): Promise<Case> => {
  const response = await fetch(`${API_BASE_URL}/cases`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(caseData),
  });

  if (!response.ok) {
    return handleError(response);
  }
  return response.json();
};

export const updateCase = async (id: string, caseData: CaseInput): Promise<Case> => {
  const response = await fetch(`${API_BASE_URL}/cases/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(caseData),
  });

  if (!response.ok) {
    return handleError(response);
  }
  return response.json();
};

export const deleteCase = async (id: string): Promise<Case> => {
  const response = await fetch(`${API_BASE_URL}/cases/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    return handleError(response);
  }
  return response.json();
};