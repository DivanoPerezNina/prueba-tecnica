// src/hooks/useLoginController.ts

"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import * as authService from '@/services/auth.service';
import Cookies from 'js-cookie';

export const useLoginController = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const data = await authService.login(username, password);

            Cookies.set('jwt-token', data.token, {
                expires: 1 / 24, 
                secure: process.env.NODE_ENV === 'production', 
                path: '/' 
            });

            localStorage.setItem('jwt-token', data.token);

            router.push('/');

        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Ocurrió un error inesperado');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return {
        username,
        password,
        isLoading,
        error,
        setUsername,
        setPassword,
        handleSubmit,
    };
};