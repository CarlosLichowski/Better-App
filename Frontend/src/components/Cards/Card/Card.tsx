// Card.tsx
import './Card.css';
import { ReactNode } from 'react'; // Importa ReactNode para los hijos

// Añade `children` a la interfaz de props
function Card({ CardTitle, CardImg, CardDescription, children }: { CardTitle: string; CardImg: string; CardDescription: string; children?: ReactNode }) {
    return (
        <>
            <div className='CardContainer'>
                <img className='CardImg' src={CardImg} alt='CardImg'/>
                <h3 className='CardTitle'>{CardTitle}</h3>
                <p className='CardDescription'>{CardDescription}</p>
                {children} {/* Renderiza los hijos aquí */}
            </div>
        </>
    );
}

export default Card;