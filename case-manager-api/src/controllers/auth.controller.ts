import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// Leemos el secreto de las variables de entorno o usamos uno por defecto
const JWT_SECRET = process.env.JWT_SECRET || "esta-es-una-clave-secreta-para-la-prueba";

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Usuario y contraseña son requeridos' });
  }

  if (username === 'admin' && password === 'password') {
    const token = jwt.sign(
      { userId: '123', username: 'admin' },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    return res.status(200).json({ token });
  }

  return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
};