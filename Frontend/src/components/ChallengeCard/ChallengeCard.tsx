// frontend/src/components/ChallengeCard/ChallengeCard.tsx

import './ChallengeCard.css'; // Asegúrate de tener este archivo CSS

interface ChallengeCardProps {
  id: string; // El ID del desafío, lo necesitaremos para la API
  title: string;
  description: string;
  isCompleted: boolean; // Para saber si está completado
  onComplete: (challengeId: string) => void; // Función para marcar como completado
}

function ChallengeCard({ id, title, description, isCompleted, onComplete }: ChallengeCardProps) {
  // Condicionalmente aplica la clase 'completed' si el desafío está hecho
  const cardClassName = `challengeCardContainer ${isCompleted ? 'completed' : ''}`;

  return (
    <div className={cardClassName} onClick={() => onComplete(id)}>
      <h3 className='challengeCardTitle'>{title}</h3>
      <p className='challengeCardDescription'>{description}</p>
      {isCompleted && <span className="completionMark">&#10003;</span>} {/* Un checkmark simple */}
    </div>
  );
}

export default ChallengeCard;