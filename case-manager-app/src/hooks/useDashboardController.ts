// src/hooks/useDashboardController.ts

"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import * as caseService from '@/services/case.service';
import type { Case, CaseInput } from '@/types';
import Cookies from 'js-cookie';

export const useDashboardController = () => {
  const router = useRouter();

  const [cases, setCases] = useState<Case[]>([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null);
  const [editingCase, setEditingCase] = useState<Case | null>(null);

  const fetchCases = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await caseService.getAllCases();
      setCases(data);
    } catch (err) {
      if (err instanceof Error && (err.message.includes('401') || err.message.includes('403') || err.message.includes('token'))) {
        Cookies.remove('jwt-token');
        router.push('/login');
      } else {
        setError(err instanceof Error ? err.message : 'Error al cargar expedientes');
      }
    } finally {
      setIsLoading(false);
    }
  }, [router]); 

  useEffect(() => {
    fetchCases();
  }, [fetchCases]); 

  const handleCreate = async (caseData: CaseInput) => {
    try {
      await caseService.createCase(caseData);
      await fetchCases(); 
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear expediente');
      throw err;
    }
  };

  const handleUpdate = async (caseData: CaseInput) => {
    if (!editingCase) return;
    try {
      await caseService.updateCase(editingCase.id, caseData);
      await fetchCases(); 
      setEditingCase(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar expediente');
      throw err;
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este expediente?')) {
      return;
    }
    
    try {
      await caseService.deleteCase(id);
      await fetchCases();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar expediente');
    }
  };

  const handleSelectCaseToEdit = (caseItem: Case) => {
    setEditingCase(caseItem);
  };

  const handleCancelEdit = () => {
    setEditingCase(null);
  };

  const handleLogout = () => {
    Cookies.remove('jwt-token');
    router.push('/login');
  };

  return {
    cases,
    isLoading,
    error,
    editingCase,
    handleSelectCaseToEdit,
    handleCancelEdit,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleLogout,
    retryFetch: fetchCases 
  };
};