import axios, { AxiosInstance, AxiosResponse } from 'axios';

// API response types
interface ApiResponse<T> {
  data: T;
  error?: string;
}

interface CachedData {
  data: string;
}

interface ProcessedData {
  processed: boolean;
  input: string;
}

// API client class
export class ApiClient {
  private client: AxiosInstance;
  private goClient: AxiosInstance;

  constructor() {
    // Django API client
    this.client = axios.create({
      baseURL: '/api',
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    // Go API client
    this.goClient = axios.create({
      baseURL: 'http://localhost:8080/api/v1',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      this.handleError
    );

    this.goClient.interceptors.response.use(
      (response) => response,
      this.handleError
    );
  }

  // Error handler
  private handleError(error: any): Promise<never> {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response error:', error.response.data);
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Request error:', error.request);
      return Promise.reject(new Error('No response received from server'));
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', error.message);
      return Promise.reject(error);
    }
  }

  // Django API methods
  async getCsrfToken(): Promise<string> {
    const response = await this.client.get<string>('/csrf-token/');
    return response.data;
  }

  // Go API methods
  async getCachedData(key: string): Promise<ApiResponse<CachedData>> {
    const response: AxiosResponse<ApiResponse<CachedData>> = await this.goClient.get(
      `/cached-data/${key}`
    );
    return response.data;
  }

  async processData(input: string): Promise<ApiResponse<ProcessedData>> {
    const response: AxiosResponse<ApiResponse<ProcessedData>> = await this.goClient.post(
      '/process-data',
      { input }
    );
    return response.data;
  }
}

// Create a singleton instance
export const api = new ApiClient(); 
