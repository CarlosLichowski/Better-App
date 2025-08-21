// SearchBar.tsx
import './SeachBar.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; 

function SearchBar() {
    // Obtén el estado de autenticación y la función logout del contexto
    const { isLoggedIn, logout } = useAuth();

    const handleLogout = () => {
        logout(); // Llama a la función logout del contexto
    };

    return (
        <div className="SearchBarContainer">
            <input className="searchBar" type="text" placeholder="Search" />
            
            {/* Renderizado condicional del botón/enlace de autenticación */}
            {isLoggedIn ? (
                // Si el usuario está logueado, muestra un botón de Logout
                <button className="LoginBtn" onClick={handleLogout}>
                    Logout
                </button>
            ) : (
                // Si el usuario no está logueado, muestra el enlace a Login
                <Link className="LoginBtn" to='/Login'>
                    Connect
                </Link>
            )}
        </div>
    );
}

export default SearchBar;