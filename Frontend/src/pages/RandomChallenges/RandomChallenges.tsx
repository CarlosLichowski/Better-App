// /pages/RandomChallenges/RandomChallenges.tsx

import React, { useState } from 'react'; // Importa useState
import './RandomChallenges.css';

// Componentes para el contenido de cada sección
// Puedes crear estos en archivos separados si el contenido es complejo
const MindChallenges = () => (
    <div>
        <h3>Desafíos Mentales y Creativos</h3>
        <ul>
            <li>Durante una hora, haz lo opuesto a lo que harías normalmente.</li>
            <li>Durante 15 minutos, narra todo lo que hagas como si fueras un cineasta.</li>
            <li>Elige un objeto y construye una historia palabra por palabra.</li>
            <li>Escribe un haiku sobre tu almuerzo.</li>
            <li>Recita el alfabeto al revés lo más rápido que puedas.</li>
        </ul>
    </div>
);

const PhysicalChallenges = () => (
    <div>
        <h3>Desafíos Físicos y de Movimiento</h3>
        <ul>
            <li>Muévete como un animal por tu casa durante cinco minutos.</li>
            <li>Intenta mantenerte en una pierna todo el tiempo posible.</li>
            <li>Camina hacia atrás 50 pasos en un lugar seguro.</li>
            <li>Busca una pose de yoga en silla y mantenla por un minuto.</li>
            <li>Permanece perfectamente quieto como una estatua por 60 segundos.</li>
        </ul>
    </div>
);

const SocialChallenges = () => (
    <div>
        <h3>Desafíos Sociales e Interpersonales</h3>
        <ul>
            <li>Haz un cumplido genuino a un extraño.</li>
            <li>Aprende a decir "hola" y "gracias" en un idioma nuevo.</li>
            <li>Ofrece ayuda inesperadamente a alguien.</li>
            <li>Haz contacto visual con cinco personas e intenta que te sonrían.</li>
            <li>Comparte un dato curioso con un amigo o familiar.</li>
        </ul>
    </div>
);

const HumorousChallenges = () => (
    <div>
        <h3>Desafíos Aleatorios y Humorísticos</h3>
        <ul>
            <li>Usa una prenda al revés por una hora.</li>
            <li>Intenta hablar solo con rimas por cinco minutos.</li>
            <li>Toma una decisión menor al azar con una moneda.</li>
            <li>Encuentra una nube que se parezca a un animal.</li>
            <li>Reorganiza cinco objetos al azar en tu entorno.</li>
        </ul>
    </div>
);


function RandomChallenges() {
    // Usamos el estado para saber qué sección está activa
    const [activeSection, setActiveSection] = useState('mind'); // Estado inicial: 'mind'

    // Función para renderizar el contenido basado en la sección activa
    const renderContent = () => {
        switch (activeSection) {
            case 'mind':
                return <MindChallenges />;
            case 'physical':
                return <PhysicalChallenges />;
            case 'social':
                return <SocialChallenges />;
            case 'humorous':
                return <HumorousChallenges />;
            default:
                return <MindChallenges />; // Fallback por si acaso
        }
    };

    return (
        <div className="randomChallengesContainer">
            <div className="randomChallengesbox">
                {/* Navbar para las secciones */}
                <div className="randomChallengesLinks">
                    <button
                        className={activeSection === 'mind' ? 'active-link' : ''}
                        onClick={() => setActiveSection('mind')}
                    >
                        Mente y Creatividad
                    </button>
                    <button
                        className={activeSection === 'physical' ? 'active-link' : ''}
                        onClick={() => setActiveSection('physical')}
                    >
                        Físicos
                    </button>
                    <button
                        className={activeSection === 'social' ? 'active-link' : ''}
                        onClick={() => setActiveSection('social')}
                    >
                        Sociales
                    </button>
                    <button
                        className={activeSection === 'humorous' ? 'active-link' : ''}
                        onClick={() => setActiveSection('humorous')}
                    >
                        Humorísticos
                    </button>
                </div>

                {/* Contenido que cambia */}
                <div className="randomChallengesContent">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}

export default RandomChallenges;



        {/*
    
    Random Challenges


        Listen an artist o song that you have never heard before
        Go the párk and sit on a bench for a few minutes. Let loose and have fun!
        walk borefoot
        Meditate for a few minutes
listen a Podcast
       a fewminutes. Let loose and have fun!
        Play a Instrument
        Call a Friend
        Write a Letter
        Dance Like No One's Watching
        Take a Different Route
        Compliment a Stranger
        Learn a "Hello" in a New Language
    Take a Different Route: If you usually take the same route to school or work, try a different one today. It could be a new street, a park, or even a bike path.
        Compliment a Stranger: Give a genuine, non-creepy compliment to one person you don't
        know (e.g., "I love your bag!" or "That's a nice shirt!").
    Learn a "Hello" in a New Language: Learn how to say "hello" and "thank you" in a language you don't know, and try to use it (even if just to yourself).
        Offer Help Unexpectedly
        Spot the Smile
        Share a Fun Fact
    Play an Instrument: If you have an instrument at home, play a short tune or just make some noise with it. If you don't, try humming or clapping a rhythm.
    Call a Friend: Call or video chat with a friend you haven't spoken to in a while. Just say hi and catch up for a few minutes.
    Write a Letter: Write a short letter or note to someone you care about. It can be a thank you note, a letter of appreciation, or just a friendly hello.
    Dance Like No One's Watching: Put on your favorite song and dance around your room for
  Compliment a Stranger: Give a genuine, non-creepy compliment to one person you don't know (e.g., "I love your bag!" or "That's a nice shirt!").
Learn a "Hello" in a New Language: Learn how to say "hello" and "thank you" in a language you don't know, and try to use it (even if just to yourself).
Offer Help Unexpectedly: Find a small way to help someone without being asked (e.g., hold a door, pick up something someone dropped, offer to carry something).
Spot the Smile: Make eye contact with five different people and see if you can elicit a smile (respectfully, without staring).
Share a Fun Fact: Find an unusual fun fact and share it with a friend or family member.


    */}