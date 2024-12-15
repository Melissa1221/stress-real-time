import { API_URL } from '../config/env';

interface StressAnalysis {
  stress_percentage: number;
  description: string;
}

interface StressResponse {
  success: boolean;
  data?: StressAnalysis;
  error?: string;
}

export class StressService {
  static async getAnalysis(token: string): Promise<StressResponse> {
    try {
      if (!token) {
        return {
          success: false,
          error: 'No hay token de autenticación'
        };
      }

      const response = await fetch(`${API_URL}/stress/analysis`, {
        headers: {
          'Authorization': `Bearer ${token.replace('Bearer ', '')}`
        }
      });

      if (response.status === 401) {
        localStorage.removeItem('user');
        window.location.href = '/';
        return {
          success: false,
          error: 'Sesión expirada. Por favor, inicia sesión nuevamente.'
        };
      }

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.detail || 'Error al obtener el análisis.'
        };
      }

      return {
        success: true,
        data
      };
    } catch (error) {
      console.error('Error getting stress analysis:', error);
      return {
        success: false,
        error: "Error al conectar con el servidor. Intenta nuevamente."
      };
    }
  }
} 