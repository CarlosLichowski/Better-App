// Home.tsx
import { useState, useEffect } from 'react';
import Graphs from '../../components/Graph/Graphs';
import Table from '../../components/Table/Table';
import './Home.css';
import Card from '../../components/Cards/Card/Card';
import excersice from '../../assets/excersice2.png';
import study from '../../assets/study.png';
import clean from '../../assets/clean.png';
import user from '../../assets/user.png'; // Asumiendo que esta es tu imagen de perfil
import { BACKEND_URL } from '../Login/backend_url';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom'; // Asegúrate de que esto esté importado

// Define la interfaz para los datos de las cards dinámicas
interface DynamicCardData {
    title: string;
    description: string;
    imageUrl: string; // Cambiado de image_url a imageUrl para consistencia
}

function Home() {
    const { isLoggedIn } = useAuth();
    const [dynamicCardData, setDynamicCardData] = useState<DynamicCardData[] | null>(null);
    const [loadingCards, setLoadingCards] = useState(false);
    const [errorCards, setErrorCards] = useState<string | null>(null);

    const staticCards = [
        { img: excersice, title: "Exercise", description: "Improve your physical health." },
        { img: study, title: "Study", description: "Enhance your knowledge and skills." },
        { img: clean, title: "Organize", description: "Organize your space, organize your mind." },
        { img: user, title: "Profile", description: "Your personalized profile." }, // Puedes mantener esta estática si quieres
    ];

    useEffect(() => {
        const fetchDynamicCards = async () => {
            if (isLoggedIn) {
                setLoadingCards(true);
                setErrorCards(null);
                try {
                    const token = localStorage.getItem('access_token');
                    if (!token) {
                        setLoadingCards(false);
                        return;
                    }

                    const response = await fetch(`${BACKEND_URL}/users/me/dashboard_cards`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(`Error al cargar datos: ${errorData.detail || response.statusText}`);
                    }

                    const data: DynamicCardData[] = await response.json();
                    setDynamicCardData(data);
                } catch (error: any) {
                    console.error('Error fetching dynamic card data:', error);
                    setErrorCards(`No se pudieron cargar los datos de las tarjetas: ${error.message}`);
                } finally {
                    setLoadingCards(false);
                }
            } else {
                setDynamicCardData(null);
            }
        };

        fetchDynamicCards();
    }, [isLoggedIn]);

    const renderCards = () => {
        if (loadingCards) {
            return <p>Cargando datos del usuario...</p>;
        }

        if (errorCards) {
            return <p className="error-message">{errorCards}</p>;
        }

        const cardsToRender = isLoggedIn && dynamicCardData ? dynamicCardData : staticCards;

        return cardsToRender.map((card, index) => {
            // Renderiza la 4ta tarjeta de manera especial (índice 3 en un array basado en 0)
            if (index === 3) {
                return (
                    <Card
                        key={index}
                        CardImg={isLoggedIn ? user : card.img} // Usa user.png para la imagen de perfil si está logueado
                        CardTitle={isLoggedIn ? "Mi Perfil" : card.title}
                        CardDescription={isLoggedIn ? "Accede a la configuración de tu perfil." : card.description}
                    >
                        {/* El botón "New Task" se moverá aquí si el usuario está logueado */}
                        {isLoggedIn && (
                            <Link to="/newTask" className='taskBtnInCard'>New Task</Link> // Clase para estilizar dentro de la tarjeta
                        )}
                    </Card>
                );
            } else {
                // Renderiza las otras tarjetas normalmente
                return (
                    <Card
                        key={index}
                        CardImg={card.imageUrl || card.img} // Usa imageUrl si existe (para dinámicas), de lo contrario img
                        CardTitle={card.title}
                        CardDescription={card.description}
                    />
                );
            }
        });
    };

    return (
        <div className='homeContainer'>
            <div className='homeBoxes'>
                {renderCards()}
            </div>
            {/* Si el usuario NO está logueado, el botón "New Task" permanece aquí */}
            {!isLoggedIn && (
                <Link to="/newTask" className='taskBtn'>New Task</Link>
            )}
            {/* <Graphs/> */}
            {/* <Table/> */}
        </div>
    );
}

export default Home;