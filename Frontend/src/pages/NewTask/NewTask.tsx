import React, { useState } from 'react';
import './NewTask.css';
import excersice from '../../assets/excersice.png';
import cleaning from '../../assets/clean.png';
import study from '../../assets/study.png';
// Importa useNavigate para redirigir después de crear la tarea (opcional)
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../Login/backend_url'; // Asegúrate de que esta ruta sea correcta
import { useAuth } from '../../contexts/AuthContext'; // Para obtener el token de autenticación

// Define la interfaz para los datos de la tarea a enviar al backend
// Ajusta esto según tu models.py en FastAPI para TodoCreate
interface TaskPayload {
    description: string;
    priority: 'Low' | 'Medium' | 'High' | 'Top';
    due_date?: string | null; // Opcional, puede ser null
    // is_completed: boolean; // El backend probablemente lo establece por defecto
    // user_id: string; // El backend lo obtiene del token
}

const NewTask = () => {
    const navigate = useNavigate(); // Hook para la navegación
    const { isLoggedIn } = useAuth(); // Obtén el estado de autenticación y el token si lo necesitas
    
    // Estado para controlar qué tipo de tarea se ha seleccionado
    const [selectedTaskType, setSelectedTaskType] = useState<string | null>(null);
    // Estado para la descripción de la nueva tarea
    const [taskDescription, setTaskDescription] = useState<string>('');
    // Estado para la prioridad de la nueva tarea (puedes establecer un valor por defecto)
    const [taskPriority, setTaskPriority] = useState<TaskPayload['priority']>('Medium');
    // Estado para la fecha de vencimiento (opcional)
    const [taskDueDate, setTaskDueDate] = useState<string>(''); // Formato 'YYYY-MM-DD'
    // Estado para el mensaje de carga/éxito/error
    const [message, setMessage] = useState<string | null>(null);
    const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    // Datos de las categorías de tareas
    const taskCategories = [
        { type: 'Training', img: excersice, label: 'Training Task' },
        { type: 'Cleaning', img: cleaning, label: 'Cleaning Task' },
        { type: 'Study', img: study, label: 'Study Task' },
    ];

    const handleCategoryClick = (type: string) => {
        setSelectedTaskType(type);
        setTaskDescription(''); // Limpiar descripción al cambiar de categoría
        setTaskDueDate(''); // Limpiar fecha al cambiar
        setMessage(null); // Limpiar mensajes
        setMessageType(null);
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskDescription(e.target.value);
    };

    const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTaskPriority(e.target.value as TaskPayload['priority']);
    };

    const handleDueDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskDueDate(e.target.value);
    };

    const handleSubmitTask = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!taskDescription.trim()) {
            setMessage('La descripción de la tarea no puede estar vacía.');
            setMessageType('error');
            return;
        }

        if (!isLoggedIn) {
            setMessage('Debes iniciar sesión para crear tareas.');
            setMessageType('error');
            return;
        }

        const token = localStorage.getItem('access_token');
        if (!token) {
            setMessage('No se encontró el token de autenticación. Inicia sesión de nuevo.');
            setMessageType('error');
            return;
        }

        setLoading(true);
        setMessage(null);
        setMessageType(null);

        // Construir el payload de la tarea
        const payload: TaskPayload = {
            description: `[${selectedTaskType}] ${taskDescription}`, // Prefija con la categoría
            priority: taskPriority,
            due_date: taskDueDate ? new Date(taskDueDate).toISOString() : null, // Formato ISO si hay fecha
        };

        try {
            const response = await fetch(`${BACKEND_URL}/todos/`, { // <-- Ajusta este endpoint si es diferente
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const data = await response.json();
                setMessage(`Tarea "${data.description}" creada exitosamente!`);
                setMessageType('success');
                setTaskDescription(''); // Limpiar el input
                setTaskDueDate('');
                setSelectedTaskType(null); // Volver a la selección de categoría
                setTaskPriority('Medium');
                // Opcional: Redirigir al usuario a una página de lista de tareas o al dashboard
                // navigate('/dashboard');
            } else {
                const errorData = await response.json();
                setMessage(`Error al crear la tarea: ${errorData.detail || response.statusText}`);
                setMessageType('error');
                console.error('Backend Error:', errorData);
            }
        } catch (error: any) {
            setMessage(`Error de red: ${error.message}`);
            setMessageType('error');
            console.error('Network Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="newTaskContainer">
            <h1>New Task</h1>

            {message && (
                <div className={`notification-message ${messageType}`}>
                    {message}
                </div>
            )}

            {!selectedTaskType ? (
                // Mostrar la selección de categorías si no se ha seleccionado ninguna
                <div className='taskCategories'>
                    {taskCategories.map((category) => (
                        <div key={category.type} className='taskCategoryItem'>
                            <img className='newTaskImg' src={category.img} alt={category.type + ' task'}/>
                            <button onClick={() => handleCategoryClick(category.type)} className='taskBtn'>
                                {category.label}
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                // Mostrar el formulario de descripción si se ha seleccionado una categoría
                <div className="taskDescriptionForm">
                    <h2>Add {selectedTaskType} Task</h2>
                    <form onSubmit={handleSubmitTask}>
                        <div className="form-group">
                            <label htmlFor="descriptionInput">Description:</label>
                            <input
                                type="text"
                                id="descriptionInput"
                                value={taskDescription}
                                onChange={handleDescriptionChange}
                                placeholder={`Describe your ${selectedTaskType.toLowerCase()} task...`}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="prioritySelect">Priority:</label>
                            <select id="prioritySelect" value={taskPriority} onChange={handlePriorityChange}>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                                <option value="Top">Top</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="dueDateInput">Due Date (Optional):</label>
                            <input
                                type="date"
                                id="dueDateInput"
                                value={taskDueDate}
                                onChange={handleDueDateChange}
                            />
                        </div>
                        <div className="form-actions">
                            <button type="submit" className="submitTaskBtn" disabled={loading}>
                                {loading ? 'Adding...' : 'Add Task'}
                            </button>
                            <button type="button" className="cancelTaskBtn" onClick={() => setSelectedTaskType(null)}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

export default NewTask;