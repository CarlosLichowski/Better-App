import React, { useEffect, useState, useCallback } from 'react';
import { BACKEND_URL } from '../Login/backend_url'; // Adjust path if necessary
import { useAuth } from '../../contexts/AuthContext'; // For authentication state
import TodoItem from '../../components/TodoItem/TodoItem'; // Ensure this path is correct
import './WorkPanel.css'; // CSS file for this component

// Define the interface for a task, based on your `TodoResponse` from the backend
interface Task {
    id: string;
    description: string;
    priority: 'Low' | 'Medium' | 'High' | 'Top';
    due_date?: string | null; // Can be optional and null
    is_completed: boolean;
    created_at: string;
    completed_at?: string | null; // Can be optional and null
    user_id: string; // Include if you need it for specific frontend logic
}

const WorkPanel: React.FC = () => {
    const { isLoggedIn } = useAuth();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const token = localStorage.getItem('access_token'); // Get the token from localStorage

    // States for the new task form
    const [newDescription, setNewDescription] = useState('');
    const [newPriority, setNewPriority] = useState<'Low' | 'Medium' | 'High' | 'Top'>('Medium');
    const [newDueDate, setNewDueDate] = useState<string | null>(null); // Stores 'YYYY-MM-DD' from date input

    // Function to load tasks from the backend
    const fetchTasks = useCallback(async () => {
        if (!isLoggedIn || !token) {
            setError('You must be logged in to view your Work Panel.');
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${BACKEND_URL}/todos/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}` // Include the authentication token
                }
            });

            if (response.ok) {
                const data: Task[] = await response.json();
                // Filter only pending tasks for this panel
                setTasks(data.filter(task => !task.is_completed));
            } else {
                const errorData = await response.json();
                setError(`Error loading tasks: ${errorData.detail || response.statusText}`);
                console.error('Backend Error (fetch tasks):', errorData);
            }
        } catch (err: any) {
            setError(`Network error: ${err.message}`);
            console.error('Network Error (fetch tasks):', err);
        } finally {
            setLoading(false);
        }
    }, [isLoggedIn, token]); // Dependencies for useCallback

    // Load tasks on component mount or when dependencies change
    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]); // Runs when fetchTasks changes (which is when isLoggedIn or token change)

    // Callback to update a task in the local state (e.g., when completed)
    const handleTaskUpdate = useCallback((updatedTask: Task) => {
        setTasks(prevTasks => {
            // If the updated task is completed, filter it out from the pending list
            if (updatedTask.is_completed) {
                return prevTasks.filter(task => task.id !== updatedTask.id);
            }
            // If it's not completed (e.g., if we allowed unmarking), update it
            return prevTasks.map(task => 
                task.id === updatedTask.id ? updatedTask : task
            );
        });
    }, []);

    // Callback to delete a task from the local state
    const handleTaskDelete = useCallback((deletedTaskId: string) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== deletedTaskId));
    }, []);

    // Function to handle the creation of a new task
    const handleCreateTask = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isLoggedIn || !token) {
            alert('You must be logged in to create tasks.');
            return;
        }

        if (!newDescription.trim()) { // Ensure description is not just whitespace
            alert('Description is required.');
            return;
        }

        let formattedDueDate: string | null = null;
        if (newDueDate) {
            // newDueDate from type="date" is 'YYYY-MM-DD'
            // Convert to ISO 8601 string with UTC timezone (Z)
            // Example: "2025-06-21" becomes "2025-06-21T00:00:00Z"
            // This is the most robust format for FastAPI datetime parsing.
            formattedDueDate = `${newDueDate}T00:00:00Z`; 
        }

        try {
            const response = await fetch(`${BACKEND_URL}/todos/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    description: newDescription.trim(), // Trim whitespace before sending
                    priority: newPriority,
                    due_date: formattedDueDate // Use the formatted date here
                })
            });

            if (response.ok) {
                const newTask: Task = await response.json();
                // A newly created task should always be !is_completed by default
                // So, we can directly add it to the list without re-filtering
                setTasks(prevTasks => [newTask, ...prevTasks]); // Add the new task to the beginning
                setNewDescription(''); // Clear the form
                setNewDueDate(null); // Reset the date input
                alert(`Task "${newTask.description}" created successfully.`);
            } else {
                const errorData = await response.json();
                setError(`Error creating task: ${errorData.detail || response.statusText}`);
                console.error('Backend Error (create todo):', errorData);
            }
        } catch (error) {
            console.error('Network error creating task:', error);
            alert('Network error creating task.');
        }
    };

    if (loading) {
        return <div className="work-panel-container">Loading Work Panel tasks...</div>;
    }

    if (error) {
        return <div className="work-panel-container error-message">{error}</div>;
    }

    return (
        <div className="work-panel-container">
            <h1>My Work Panel</h1>

            {/* Form for creating new tasks */}
            <form onSubmit={handleCreateTask} className="new-task-form">
                <input
                    type="text"
                    placeholder="Description of the new task"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="new-task-input"
                    required
                />
                <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as 'Low' | 'Medium' | 'High' | 'Top')}
                    className="new-task-select"
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Top">Top</option>
                </select>
                <input
                    type="date"
                    value={newDueDate || ''} // Handle null state for date input
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="new-task-date"
                />
                <button type="submit" className="new-task-button">
                    Create Task
                </button>
            </form>

            {tasks.length === 0 ? (
                <p className="no-tasks-message">Great! No pending tasks in your Work Panel.</p>
            ) : (
                <div className="task-list">
                    {tasks.map(task => (
                        <TodoItem 
                            key={task.id} 
                            todo={task} 
                            onTodoUpdate={handleTaskUpdate} // Pass update function
                            onDeleteTodo={handleTaskDelete} // Pass delete function
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default WorkPanel;