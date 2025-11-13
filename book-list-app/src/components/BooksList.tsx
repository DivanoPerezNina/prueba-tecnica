// src/components/BooksList.tsx
"use client";

import React, { useState, useEffect } from 'react';

// --- Interfaces ---
interface Author {
    name: string;
}

interface Book {
    id: number;
    title: string;
    authors: Author[];
}

interface ApiResponse {
    results: Book[];
}

// --- Componente ---
export default function BooksList() {

    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('https://gutendex.com/books/?page=1');

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }

                const data: ApiResponse = await response.json();
                setBooks(data.results);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Ocurrió un error desconocido');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    // --- Renderizado Condicional ---
    if (loading) {
        return <p className="loading">Cargando libros...</p>;
    }

    if (error) {
        return <p className="error">Error al cargar los libros</p>;
    }

    // --- Renderizado Exitoso ---
    return (
        <div>
            <h2>Los 10 Primeros Libros</h2>
            <ul>
                {books.slice(0, 10).map((book) => (
                    <li key={book.id}>
                        <strong>{book.title}</strong>
                        <span>
                            Autor: {book.authors[0]?.name || 'Desconocido'}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}