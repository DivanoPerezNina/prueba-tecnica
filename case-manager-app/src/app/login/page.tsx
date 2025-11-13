// src/app/login/page.tsx

"use client"; 

import React from 'react';
import { useLoginController } from '@/hooks/useLoginController'; 

export default function LoginPage() {
  const {
    username,
    password,
    isLoading,
    error,
    setUsername,
    setPassword,
    handleSubmit,
  } = useLoginController();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">
          Iniciar Sesión
        </h2>
        
        <form onSubmit={handleSubmit}>
          {/* ----- Campo de Usuario ----- */}
          <div className="mb-4">
            <label 
              htmlFor="username" 
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Usuario
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} 
              disabled={isLoading}
              className="w-full rounded-md border border-gray-300 p-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="admin"
            />
          </div>

          {/* ----- Campo de Contraseña ----- */}
          <div className="mb-6">
            <label 
              htmlFor="password" 
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              disabled={isLoading}
              className="w-full rounded-md border border-gray-300 p-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="password"
            />
          </div>

          {/* ----- Mensaje de Error (Feedback de UI) ----- */}
          {error && (
            <div className="mb-4 rounded-md border border-red-400 bg-red-50 p-3 text-center text-sm text-red-700">
              {error}
            </div>
          )}

          {/* ----- Botón de Envío ----- */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full rounded-md px-4 py-3 font-semibold text-white shadow-sm
                ${isLoading 
                  ? 'cursor-not-allowed bg-indigo-400' 
                  : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'}
              `}
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}