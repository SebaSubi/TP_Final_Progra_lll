import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

interface FetchOptions extends AxiosRequestConfig {
  endpoint: string;
  redirectRoute?: string;
  formData?: any;
}

export function useAuthFetch() {
  

  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    setToken(window.localStorage.getItem('token'));
  }, []);

  const authFetch = async ({ endpoint, redirectRoute, formData, ...options }: FetchOptions) => {
    try {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(endpoint, formData, options);

      if (redirectRoute) {
        // redirige a la ruta especificada
      }

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return authFetch;
}