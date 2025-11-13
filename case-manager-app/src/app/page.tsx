// src/app/page.tsx

"use client";

import { useDashboardController } from '@/hooks/useDashboardController';
import CaseForm from '@/components/CaseForm';
import CaseTable from '@/components/CaseTable';
import type { CaseInput } from '@/types';

export default function DashboardPage() {
  const {
    cases,
    isLoading,
    error,
    editingCase,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleLogout,
    handleSelectCaseToEdit,
    handleCancelEdit,
    retryFetch
  } = useDashboardController();

  const handleSubmitForm = async (caseData: CaseInput) => {
    if (editingCase) {
      await handleUpdate(caseData);
    } else {
      // Modo Crear
      await handleCreate(caseData);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-7xl">
        
        {/* ----- Cabecera ----- */}
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold text-gray-900">
            Gestión de Expedientes
          </h1>
          <button
            onClick={handleLogout}
            className="rounded-md bg-red-600 px-4 py-2 font-semibold text-white shadow-sm hover:bg-red-700"
          >
            Cerrar Sesión
          </button>
        </header>

        {/* ----- Contenido Principal ----- */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          
          {/* ----- Columna del Formulario (Crear/Editar) ----- */}
          <div className="lg:col-span-1">
            <CaseForm
              initialData={editingCase} 
              onSubmit={handleSubmitForm}
              buttonText={editingCase ? 'Actualizar Expediente' : 'Crear Expediente'}
              onCancel={editingCase ? handleCancelEdit : undefined}
            />
          </div>

          {/* ----- Columna de la Tabla (Listar) ----- */}
          <div className="lg:col-span-2">
            {/* Estado de Carga */}
            {isLoading && (
              <div className="flex h-64 items-center justify-center rounded-lg bg-white p-6 text-lg font-medium text-gray-600 shadow-md">
                Cargando expedientes...
              </div>
            )}

            {/* Estado de Error */}
            {error && (
              <div className="rounded-lg border-2 border-dashed border-red-300 bg-white p-6 text-center text-red-700 shadow-md">
                <h3 className="text-lg font-semibold">Error al Cargar</h3>
                <p className="mb-4">{error}</p>
                <button
                  onClick={retryFetch}
                  className="rounded-md bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
                >
                  Reintentar
                </button>
              </div>
            )}

            {/* Estado Exitoso (Mostrar Tabla) */}
            {!isLoading && !error && (
              <CaseTable
                cases={cases}
                onEdit={handleSelectCaseToEdit} 
                onDelete={handleDelete}         
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}