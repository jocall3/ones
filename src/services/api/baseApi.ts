import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '/api'; // Fallback to relative URL for local development

const baseApi: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // Adjust as needed
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
baseApi.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem('authToken'); // Or retrieve from your auth context
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
baseApi.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    // Handle different error scenarios
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API Error:', error.response.status, error.response.data);

      // Example: Redirect to login on 401 Unauthorized
      if (error.response.status === 401) {
        // Clear token and redirect to login
        localStorage.removeItem('authToken');
        window.location.href = '/login'; // Replace with your login route
      }

      // Example: Display a generic error message
      // alert(`API Error: ${error.response.status} - ${error.response.data.message || 'Something went wrong'}`);

      return Promise.reject(error.response); // Reject with the response for component-level handling
    } else if (error.request) {
      // The request was made but no response was received
      console.error('API Error: No response received', error.request);
      // alert('API Error: No response received from the server.');
      return Promise.reject(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('API Error: Request setup error', error.message);
      // alert(`API Error: ${error.message}`);
      return Promise.reject(error.message);
    }
  }
);

export default baseApi;