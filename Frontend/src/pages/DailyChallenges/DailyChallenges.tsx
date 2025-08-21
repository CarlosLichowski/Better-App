// frontend/src/pages/DailyChallenges/DailyChallenges.tsx

import { useState, useEffect } from 'react';
import ChallengeCard from '../../components/ChallengeCard/ChallengeCard';
import './DailyChallenges.css'; // Asegúrate de tener este archivo CSS
import { getApiUrl } from '../../utils/api'; // Asumiendo que tienes una utilidad para obtener la URL base de la API
import { useAuth } from '../../contexts/AuthContext'; // Asumiendo que tienes un AuthContext para el token

// Define la interfaz para los datos que recibes del backend
interface DailyChallengeStatus {
  id: string; // El ID del DailyChallenge
  title: string;
  description: string;
  is_completed: boolean;
  completed_at: string | null; // La fecha de completado puede ser nula
}

function DailyChallenges() {
  const [challenges, setChallenges] = useState<DailyChallengeStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getToken } = useAuth(); // Obtén el token de tu contexto de autenticación

  useEffect(() => {
    fetchDailyChallenges();
  }, []); // El array vacío asegura que se ejecute solo una vez al montar

  const fetchDailyChallenges = async () => {
    setLoading(true);
    setError(null);
    const token = getToken(); // Obtén el token antes de la llamada

    if (!token) {
      setError("No authentication token found. Please log in.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${getApiUrl()}/daily-challenges/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        // Manejo de errores más específico, si el backend envía un mensaje
        const errorData = await response.json();
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }

      const data: DailyChallengeStatus[] = await response.json();
      setChallenges(data);
    } catch (err: any) {
      console.error("Error fetching daily challenges:", err);
      setError(err.message || "Failed to fetch daily challenges.");
    } finally {
      setLoading(false);
    }
  };

    // ---CONGRATULATIONS MESSAGE ---
  const allChallengesCompleted = challenges.length > 0 && challenges.every(challenge => challenge.is_completed);
  

  const handleChallengeComplete = async (challengeId: string) => {
    const token = getToken();

    if (!token) {
      setError("No authentication token found. Please log in.");
      return;
    }

    // Optimistic UI update: Asume que la petición va a ser exitosa
    setChallenges(prevChallenges =>
      prevChallenges.map(c =>
        c.id === challengeId ? { ...c, is_completed: true, completed_at: new Date().toISOString() } : c
      )
    );

    try {
      const response = await fetch(`${getApiUrl()}/daily-challenges/${challengeId}/complete`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        // Si hay un error, revertir el estado o recargar para mostrar el estado real
        const errorData = await response.json();
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }

      // No es estrictamente necesario hacer nada aquí si el UI se actualizó de forma optimista
      // Pero podrías usar la respuesta para una actualización más precisa si el backend envía el objeto completo
      const updatedChallenge: DailyChallengeStatus = await response.json();
      console.log('Challenge completed successfully:', updatedChallenge);

      // Si no usas actualización optimista, o para asegurar la consistencia:
      // fetchDailyChallenges();

    } catch (err: any) {
      console.error("Error completing challenge:", err);
      setError(err.message || "Failed to complete challenge.");
      // Revertir el estado si la actualización optimista falló
      setChallenges(prevChallenges =>
        prevChallenges.map(c =>
          c.id === challengeId ? { ...c, is_completed: false, completed_at: null } : c
        )
      );
    }
  };

  if (loading) {
    return <div className="dailychallengescontainer">Loading challenges...</div>;
  }

  if (error) {
    return <div className="dailychallengescontainer" style={{ color: 'red' }}>Error: {error}</div>;
  }

  return (
    <div className="dailychallengescontainer">
      <h2>Daily Challenges</h2>

           
      {allChallengesCompleted && (
        <div className="congratulations-message" style={{ color: 'green', fontWeight: 'bold', marginBottom: '20px' }}>
          ¡Felicidades! Has completado todos los desafíos diarios de hoy.
        </div>
      )}

      <div className="challengesGrid">
        {challenges.length === 0 ? (
          <p>No daily challenges available today.</p>
        ) : (
          challenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id} // Usamos el ID real del backend como key
              id={challenge.id}
              title={challenge.title}
              description={challenge.description}
              isCompleted={challenge.is_completed}
              onComplete={handleChallengeComplete}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default DailyChallenges;