import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

export const login = (formData) => API.post('/user/login', formData);
export const register = (formData) => API.post('/user/register', formData);