// frontend/src/Login/Login.tsx
import { useState } from 'react';
import type { FormEvent } from 'react';
import './Login.css';
import { BACKEND_URL } from './backend_url';
import { useNavigate, Link } from 'react-router-dom'; // Importa Link
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth(); 

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setMessage('');

        try {
            const formData = new URLSearchParams();
            formData.append('username', username);
            formData.append('password', password);

            const response = await fetch(`${BACKEND_URL}/auth/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData.toString()
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Login failed:', errorData.detail);
                setMessage(`Error de inicio de sesión: ${errorData.detail}`);
                return;
            }

            const data = await response.json();
            const accessToken = data.access_token;
            console.log('Login successful! Access Token:', accessToken);

            // Guarda el token en el contexto de autenticación
            login(accessToken);
            setMessage('¡Inicio de sesión exitoso!');

            setTimeout(() => {
                navigate('/'); // Redirect user to the main page after login
            }, 2000); // Wait 2 seconds before redirecting
        } catch (error) {
            console.error('Network error during login:', error);
            setMessage('Error de red al intentar iniciar sesión.');
        }
    };

    return (
        <div>
            <div className="loginContainer">
                <h1 className="loginTitle">Login</h1>
                <form className="loginForm" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        className="loginInput"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="loginInput"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="loginButton">Login</button>
                </form>
                {message && <p className="loginMessage">{message}</p>}

                {/* --- NUEVA SECCIÓN PARA REGISTRO --- */}
                <div className="registerSection">
                    <p>¿No tienes una cuenta?</p>
                    {/* Usamos Link para una navegación SPA eficiente */}
                    <Link to="/register" className="registerButton">Crear una cuenta</Link>
                </div>
                {/* --------------------------------- */}
            </div>
        </div>
    );
};

export default Login;