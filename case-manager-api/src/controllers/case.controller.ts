import { Request, Response } from 'express';
import * as caseService from '../services/case.service';
import { Case } from '../models/case.model';

export const getAllCases = async (req: Request, res: Response) => {
  const cases = await caseService.getAllCases();
  res.status(200).json(cases);
};

export const getCaseById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const caseItem = await caseService.getCaseById(id);
  
  if (!caseItem) {
    return res.status(404).json({ message: 'Expediente no encontrado' });
  }
  
  res.status(200).json(caseItem);
};

export const createCase = async (req: Request, res: Response) => {
  const caseData: Omit<Case, 'id'> = req.body;
  
  const result = await caseService.createNewCase(caseData);

  if (!result.success) {
    return res.status(400).json({ message: result.message });
  }
  
  res.status(201).json(result.data);
};

export const updateCase = async (req: Request, res: Response) => {
  const { id } = req.params;
  const caseData: Omit<Case, 'id'> = req.body;

  const result = await caseService.updateCaseById(id, caseData);

  if (!result.success) {
    if (result.message === "Expediente no encontrado") {
      return res.status(404).json({ message: result.message });
    }
    return res.status(400).json({ message: result.message });
  }
  
  res.status(200).json(result.data);
};

export const deleteCase = async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await caseService.deleteCaseById(id);
  
  if (!result.success) {
    return res.status(404).json({ message: result.message });
  }

  res.status(200).json(result.data);
};