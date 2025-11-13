export interface Case {
  id: string;
  nombre: string;
  descripcion: string;
  estado: 'abierto' | 'cerrado' | 'pendiente';
}