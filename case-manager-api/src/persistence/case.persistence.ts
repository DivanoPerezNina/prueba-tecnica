import { Case } from "../models/case.model";

// --- Base de Datos Falsa (Mock DB) ---
let casesDB: Case[] = [
  { id: "1", nombre: "Caso Alfa", descripcion: "Cliente reporta error en login", estado: "abierto" },
  { id: "2", nombre: "Caso Bravo", descripcion: "Revisión de contrato", estado: "pendiente" },
  { id: "3", nombre: "Caso Charlie", descripcion: "Consulta de facturación", estado: "cerrado" },
];
let nextCaseId = 4;

// --- Funciones de Acceso a Datos (Simula un Repositorio) ---

export const findAll = async (): Promise<Case[]> => {
  return [...casesDB]; 
};

export const findById = async (id: string): Promise<Case | undefined> => {
  return casesDB.find(c => c.id === id);
};

export const create = async (newCaseData: Omit<Case, 'id'>): Promise<Case> => {
  const newCase: Case = {
    id: String(nextCaseId++),
    ...newCaseData
  };
  casesDB.push(newCase);
  return newCase;
};

export const update = async (id: string, updatedData: Omit<Case, 'id'>): Promise<Case | undefined> => {
  const caseIndex = casesDB.findIndex(c => c.id === id);
  if (caseIndex === -1) {
    return undefined; 
  }
  
  casesDB[caseIndex] = { id, ...updatedData };
  return casesDB[caseIndex];
};

export const remove = async (id: string): Promise<Case | undefined> => {
  const caseIndex = casesDB.findIndex(c => c.id === id);
  if (caseIndex === -1) {
    return undefined; 
  }

  const deletedCase = casesDB.splice(caseIndex, 1);
  return deletedCase[0];
};