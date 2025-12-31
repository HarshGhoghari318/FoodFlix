// API configuration for frontend
// In Vite, environment variables must be prefixed with VITE_ and accessed via import.meta.env
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default API_URL;

