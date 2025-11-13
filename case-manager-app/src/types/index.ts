// --- Tipos de Autenticación ---
export interface LoginResponse {
  token: string;
}

// --- Tipos de Expedientes (Case) ---
export interface Case {
  id: string;
  nombre: string;
  descripcion: string;
  estado: 'abierto' | 'cerrado' | 'pendiente';
}

// Para peticiones de creación/actualización
export type CaseInput = Omit<Case, 'id'>;

// --- Tipos de Error Comunes ---
export interface ApiError {
  message: string;
}