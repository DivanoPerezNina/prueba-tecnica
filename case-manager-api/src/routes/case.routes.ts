import { Router } from 'express';
import * as caseController from '../controllers/case.controller';
import { verifyToken } from '../middleware/auth.middleware'; 

const router = Router();

// --- Protección de Rutas ---
router.use(verifyToken);

// --- Definición de Rutas CRUD ---

// GET /api/cases/
router.get('/', caseController.getAllCases);

// POST /api/cases/
router.post('/', caseController.createCase);

// GET /api/cases/:id
router.get('/:id', caseController.getCaseById);

// PUT /api/cases/:id
router.put('/:id', caseController.updateCase);

// DELETE /api/cases/:id
router.delete('/:id', caseController.deleteCase);

export default router;