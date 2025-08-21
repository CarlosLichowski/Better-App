// frontend/src/Register/Register.tsx

import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { BACKEND_URL } from '../../pages/Login/backend_url';
import { useNavigate, Link } from 'react-router-dom'; // Para redireccionar y el enlace de login
import './Register.css'; // Estilos para el componente Register

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setMessage('');

        if (!username || !password) {
            setMessage('El nombre de usuario y la contraseña son obligatorios.');
            return;
        }

        try {
            const response = await fetch(`${BACKEND_URL}/users/`, { // Endpoint para crear usuario
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                const data = await response.json();
                setMessage(`¡Cuenta creada exitosamente para ${data.username}! Ahora puedes iniciar sesión.`);
                // Opcional: Autologin después del registro
                // navigate('/login', { state: { registered: true, username: data.username } });
                setTimeout(() => {
                    navigate('/login'); // Redirige al usuario a la página de login
                }, 2000);
            } else {
                const errorData = await response.json();
                setMessage(`Error al registrar: ${errorData.detail || response.statusText}`);
                console.error('Registration failed:', errorData);
            }
        } catch (error) {
            console.error('Network error during registration:', error);
            setMessage('Error de red al intentar registrar.');
        }
    };

    return (
        <div className="registerContainer">
            <h1 className="registerTitle">Registrar Nueva Cuenta</h1>
            <form className="registerForm" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nombre de Usuario"
                    className="registerInput"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    className="registerInput"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="registerButton">Registrar</button>
            </form>
            {message && <p className="registerMessage">{message}</p>}
            <div className="loginLinkSection">
                <p>¿Ya tienes una cuenta?</p>
                <Link to="/login" className="loginLink">Iniciar Sesión</Link>
            </div>
        </div>
    );
};

export default Register;