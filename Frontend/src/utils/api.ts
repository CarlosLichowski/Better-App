// frontend/src/utils/api.ts
export const getApiUrl = () => {
  // Usa la variable de entorno para la URL del backend
  return import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
};