import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth.routes';
import caseRoutes from './routes/case.routes';

// --- Configuración Inicial ---
const app = express();
const PORT = process.env.PORT || 3001;

// --- Middlewares Globales ---
app.use(cors()); // Habilita CORS para todas las rutas
app.use(express.json()); // Permite al servidor entender JSON

// --- Carga de Rutas ---

app.use('/api/auth', authRoutes);

app.use('/api/cases', caseRoutes);

// --- Iniciar el Servidor ---
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});