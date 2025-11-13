// src/app/page.tsx

import BooksList from '@/components/BooksList'; 

export default function Home() {
  return (
    <main>
      <div>
        <h1>Prueba Técnica: Lista de Libros</h1>
      </div>

      <BooksList />

    </main>
  );
}