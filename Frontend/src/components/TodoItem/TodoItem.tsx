// frontend/src/components/TodoItem.tsx

import React from 'react';
import { BACKEND_URL } from '../../pages/Login/backend_url'; // Ajusta la ruta si es necesario
import { useAuth } from '../../contexts/AuthContext'; // Ajusta la ruta si es necesario
import './TodoItem.css'; // Archivo CSS para este componente

// Define la interfaz para una tarea, DEBE COINCIDIR con la interfaz 'Task' de WorkPanel.tsx
interface TodoItemProps {
    todo: {
        id: string;
        description: string;
        priority: 'Low' | 'Medium' | 'High' | 'Top';
        due_date?: string | null;
        is_completed: boolean;
        // Si hay más campos en tu TodoResponse, añádelos aquí
    };
    onTodoUpdate: (updatedTodo: any) => void; // Callback para actualizar el estado en el padre
    onDeleteTodo: (todoId: string) => void; // Callback para eliminar la tarea del padre
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onTodoUpdate, onDeleteTodo }) => {
    const { isLoggedIn } = useAuth();
    const token = localStorage.getItem('access_token'); // Obtén el token directamente

    const handleCompleteToggle = async () => {
        if (!isLoggedIn || !token) {
            alert('Debes iniciar sesión para completar tareas.');
            return;
        }

        try {
            const response = await fetch(`${BACKEND_URL}/todos/${todo.id}/complete`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const updatedTodo = await response.json();
                onTodoUpdate(updatedTodo); // Notifica al padre (WorkPanel) de la actualización
            } else {
                const errorData = await response.json();
                alert(`Error al completar la tarea: ${errorData.detail || response.statusText}`);
                console.error('Backend Error (complete todo):', errorData);
            }
        } catch (error) {
            console.error('Error de red al completar la tarea:', error);
            alert('Error de red al completar la tarea.');
        }
    };

    const handleDelete = async () => {
        if (!isLoggedIn || !token) {
            alert('Debes iniciar sesión para eliminar tareas.');
            return;
        }

        if (!window.confirm(`¿Estás seguro de que quieres eliminar la tarea "${todo.description}"?`)) {
            return;
        }

        try {
            const response = await fetch(`${BACKEND_URL}/todos/${todo.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 204) { // 204 No Content for successful DELETE
                onDeleteTodo(todo.id); // Notifica al padre (WorkPanel) de la eliminación
                alert(`Tarea "${todo.description}" eliminada exitosamente.`);
            } else {
                const errorData = await response.json();
                alert(`Error al eliminar la tarea: ${errorData.detail || response.statusText}`);
                console.error('Backend Error (delete todo):', errorData);
            }
        } catch (error) {
            console.error('Error de red al eliminar la tarea:', error);
            alert('Error de red al eliminar la tarea.');
        }
    };

    // Formatear la fecha para una mejor visualización
    const formattedDueDate = todo.due_date 
        ? new Date(todo.due_date).toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' })
        : 'No especificada';

    return (
        <div className={`todo-item ${todo.is_completed ? 'completed' : ''}`}>
            <h3>{todo.description}</h3>
            <p>Prioridad: <strong>{todo.priority}</strong></p>
            <p>Fecha Límite: {formattedDueDate}</p>
            
            <div className="todo-actions">
                {!todo.is_completed && ( // Muestra el botón de completar solo si no está completada
                    <button onClick={handleCompleteToggle} className="complete-btn">
                        Completar
                    </button>
                )}
                {todo.is_completed && <span className="status-completed">¡Completada!</span>}
                
                <button onClick={handleDelete} className="delete-btn">
                    Eliminar
                </button>
            </div>
        </div>
    );
};

export default TodoItem;