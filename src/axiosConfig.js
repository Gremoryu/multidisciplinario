import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001', // Ajusta la URL según tu servidor backend
  timeout: 5000, // Puedes ajustar el tiempo de espera (opcional)
  headers: {
    'Content-Type': 'application/json',
    // Puedes agregar cualquier otra configuración de encabezados que necesites
  },
});

export default instance;