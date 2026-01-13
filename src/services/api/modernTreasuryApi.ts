// src/services/api/modernTreasuryApi.ts

import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

// Define a base URL for the Modern Treasury API.  Consider making this configurable
const BASE_URL = 'https://app.moderntreasury.com';

// Define a type for the API key.  Consider storing this securely.
type ApiKey = string;

// Define a class for the Modern Treasury API service.
class ModernTreasuryApi {
  private apiKey: ApiKey;
  private axiosInstance: AxiosInstance;

  constructor(apiKey: ApiKey) {
    this.apiKey = apiKey;

    // Create an Axios instance with default configuration.
    this.axiosInstance = axios.create({
      baseURL: BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
    });

    // Add request interceptor to log requests (optional, for debugging).
    this.axiosInstance.interceptors.request.use(
      (config) => {
        console.log(`[Modern Treasury API Request] ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        console.error('[Modern Treasury API Request Error]', error);
        return Promise.reject(error);
      }
    );

    // Add response interceptor to handle errors globally.
    this.axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.error('[Modern Treasury API Response Error]', error);
        return Promise.reject(error);
      }
    );
  }

  // Generic method to make API requests.
  private async request<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.axiosInstance.request<T>(config);
      return response.data;
    } catch (error: any) {
      // Handle specific error cases, e.g., network errors, timeouts, etc.
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Data:', error.response.data);
        console.error('Status:', error.response.status);
        console.error('Headers:', error.response.headers);
        throw new Error(`Modern Treasury API Error: ${error.response.status} - ${error.response.data.message || 'Unknown error'}`);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Request:', error.request);
        throw new Error('Modern Treasury API Error: No response received');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Message:', error.message);
        throw new Error(`Modern Treasury API Error: ${error.message}`);
      }
    }
  }

  // Example API methods (replace with actual Modern Treasury API endpoints).

  async getAccounts(): Promise<any[]> {
    return this.request<any[]>({
      method: 'GET',
      url: '/api/accounts', // Replace with the actual endpoint
    });
  }

  async getAccount(id: string): Promise<any> {
    return this.request<any>({
      method: 'GET',
      url: `/api/accounts/${id}`, // Replace with the actual endpoint
    });
  }

  async createPaymentOrder(payload: any): Promise<any> {
    return this.request<any>({
      method: 'POST',
      url: '/api/payment_orders', // Replace with the actual endpoint
      data: payload,
    });
  }

  // Add more API methods as needed for different Modern Treasury endpoints.
}

export default ModernTreasuryApi;