import { Case } from "../models/case.model";
import * as persistence from "../persistence/case.persistence"; 

type CaseCreationData = Omit<Case, 'id'>;

export const getAllCases = async (): Promise<Case[]> => {
  return persistence.findAll();
};

export const getCaseById = async (id: string): Promise<Case | undefined> => {
  return persistence.findById(id);
};

export const createNewCase = async (caseData: CaseCreationData): Promise<{ success: boolean; message: string; data?: Case }> => {
  const { nombre, descripcion, estado } = caseData;

  if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
    return { success: false, message: 'El campo "nombre" es obligatorio.' };
  }
  
  if (!descripcion || typeof descripcion !== 'string' || descripcion.trim() === '') {
    return { success: false, message: 'El campo "descripcion" es obligatorio.' };
  }
  
  const validosEstados = ['abierto', 'cerrado', 'pendiente'];
  if (!estado || !validosEstados.includes(estado)) {
    return { success: false, message: 'El campo "estado" debe ser "abierto", "cerrado" o "pendiente".' };
  }

  const cleanData: CaseCreationData = {
    nombre: nombre.trim(),
    descripcion: descripcion.trim(),
    estado
  };

  try {
    const newCase = await persistence.create(cleanData);
    return { success: true, message: "Expediente creado con éxito", data: newCase };
  } catch (error) {
    return { success: false, message: "Error al crear el expediente en la base de datos" };
  }
};

export const updateCaseById = async (id: string, caseData: CaseCreationData): Promise<{ success: boolean; message: string; data?: Case }> => {
  const exists = await persistence.findById(id);
  if (!exists) {
    return { success: false, message: "Expediente no encontrado" };
  }

  const { nombre, descripcion, estado } = caseData;
  if (!nombre || !descripcion || !estado) {
    return { success: false, message: "Todos los campos (nombre, descripcion, estado) son obligatorios." };
  }
  const validosEstados = ['abierto', 'cerrado', 'pendiente'];
  if (!validosEstados.includes(estado)) {
    return { success: false, message: 'El campo "estado" debe ser "abierto", "cerrado" o "pendiente".' };
  }
  
  const cleanData: CaseCreationData = {
    nombre: nombre.trim(),
    descripcion: descripcion.trim(),
    estado
  };

  const updatedCase = await persistence.update(id, cleanData);
  return { success: true, message: "Expediente actualizado", data: updatedCase };
};

export const deleteCaseById = async (id: string): Promise<{ success: boolean; message: string; data?: Case }> => {
  const deletedCase = await persistence.remove(id);
  
  if (!deletedCase) {
    return { success: false, message: "Expediente no encontrado" };
  }

  return { success: true, message: "Expediente eliminado", data: deletedCase };
};