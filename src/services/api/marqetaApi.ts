// src/services/api/marqetaApi.ts

import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

interface MarqetaConfig {
  baseURL: string;
  apiKey: string;
  apiToken: string;
}

class MarqetaApi {
  private api: AxiosInstance;
  private apiKey: string;
  private apiToken: string;

  constructor(config: MarqetaConfig) {
    this.apiKey = config.apiKey;
    this.apiToken = config.apiToken;

    this.api = axios.create({
      baseURL: config.baseURL,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa(`${this.apiKey}:${this.apiToken}`)}`,
      },
    });

    this.api.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        // Log requests for debugging purposes
        console.log(`Marqeta API Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        console.error('Marqeta API Request Error:', error);
        return Promise.reject(error);
      }
    );

    this.api.interceptors.response.use(
      (response) => {
        // Log responses for debugging purposes
        console.log(`Marqeta API Response: ${response.status} ${response.config.url}`);
        return response;
      },
      (error) => {
        console.error('Marqeta API Response Error:', error);
        return Promise.reject(error);
      }
    );
  }

  // Generic method to make API requests
  async request<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.api.request<T>(config);
      return response.data;
    } catch (error: any) {
      console.error('Marqeta API Error:', error.response ? error.response.data : error.message);
      throw error; // Re-throw to allow calling function to handle the error
    }
  }

  // Example API methods (replace with actual Marqeta API endpoints and data structures)

  async getCard(cardToken: string): Promise<any> {
    return this.request({
      method: 'GET',
      url: `/cards/${cardToken}`,
    });
  }

  async createCard(cardData: any): Promise<any> {
    return this.request({
      method: 'POST',
      url: '/cards',
      data: cardData,
    });
  }

  async updateCard(cardToken: string, cardData: any): Promise<any> {
    return this.request({
      method: 'PUT',
      url: `/cards/${cardToken}`,
      data: cardData,
    });
  }

  async getTransactions(cardToken: string, count: number = 10, startIndex: number = 0): Promise<any> {
    return this.request({
      method: 'GET',
      url: `/cards/${cardToken}/transactions?count=${count}&start_index=${startIndex}`,
    });
  }

  async createTransaction(transactionData: any): Promise<any> {
    return this.request({
      method: 'POST',
      url: '/transactions',
      data: transactionData,
    });
  }

  // Add more API methods as needed for other Marqeta endpoints
}

export default MarqetaApi;