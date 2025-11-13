// src/components/CaseForm.tsx

"use client";

import { useState, useEffect } from 'react';
import type { Case, CaseInput } from '@/types';

interface CaseFormProps {
  onSubmit: (caseData: CaseInput) => Promise<void>; 
  initialData?: Case | null; 
  buttonText: string; 
  onCancel?: () => void; 
}

export default function CaseForm({ onSubmit, initialData, buttonText, onCancel }: CaseFormProps) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [estado, setEstado] = useState<'abierto' | 'cerrado' | 'pendiente'>('pendiente');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setNombre(initialData.nombre);
      setDescripcion(initialData.descripcion);
      setEstado(initialData.estado);
    } else {
      setNombre('');
      setDescripcion('');
      setEstado('pendiente');
    }
  }, [initialData]); 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const caseData: CaseInput = { nombre, descripcion, estado };

    try {
      await onSubmit(caseData);
      
      if (!initialData) {
        setNombre('');
        setDescripcion('');
        setEstado('pendiente');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al procesar la solicitud');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 rounded-lg bg-white p-6 shadow-md">
      <h3 className="mb-4 text-xl font-semibold text-gray-800">{initialData ? 'Editar Expediente' : 'Crear Nuevo Expediente'}</h3>
      
      {/* Mensaje de Error */}
      {error && (
        <div className="mb-4 rounded border border-red-400 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Campo Nombre */}
      <div className="mb-4">
        <label htmlFor="nombre" className="mb-2 block text-sm font-medium text-gray-700">Nombre</label>
        <input
          id="nombre"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          disabled={isLoading}
          required 
          className="w-full rounded-md border border-gray-300 p-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      {/* Campo Descripción */}
      <div className="mb-4">
        <label htmlFor="descripcion" className="mb-2 block text-sm font-medium text-gray-700">Descripción</label>
        <textarea
          id="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          disabled={isLoading}
          required
          className="w-full rounded-md border border-gray-300 p-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          rows={3}
        />
      </div>

      {/* Campo Estado */}
      <div className="mb-4">
        <label htmlFor="estado" className="mb-2 block text-sm font-medium text-gray-700">Estado</label>
        <select
          id="estado"
          value={estado}
          onChange={(e) => setEstado(e.target.value as 'abierto' | 'cerrado' | 'pendiente')}
          disabled={isLoading}
          className="w-full rounded-md border border-gray-300 p-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="pendiente">Pendiente</option>
          <option value="abierto">Abierto</option>
          <option value="cerrado">Cerrado</option>
        </select>
      </div>

      {/* Botones */}
      <div className="flex justify-end gap-4">
        {onCancel && ( 
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="rounded-md bg-gray-200 px-4 py-2 font-semibold text-gray-800 hover:bg-gray-300"
          >
            Cancelar
          </button>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className={`rounded-md px-4 py-2 font-semibold text-white shadow-sm
            ${isLoading ? 'cursor-not-allowed bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'}
          `}
        >
          {isLoading ? 'Guardando...' : buttonText}
        </button>
      </div>
    </form>
  );
}