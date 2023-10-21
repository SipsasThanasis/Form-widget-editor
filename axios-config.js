
// axios-config.js

import axios from 'axios';

// Create an Axios instance with a base URL
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5173', // Replace with your actual server URL
});

export default axiosInstance;
