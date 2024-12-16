import { API_URL } from '../config/env';
import { NavigationService } from './navigation.service';
import { STRESS_LEVELS, StressLevel } from '../shared/constants/stress-levels';

interface StressAnalysis {
  stress_percentage: number;
  description: string;
  state: string;
  suggestion: string;
  consequences: string;
}

interface StressResponse {
  success: boolean;
  data?: StressAnalysis;
  error?: string;
}

export class StressService {
  static getStressLevel(percentage: number): StressLevel {
    return STRESS_LEVELS.find(
      level => percentage >= level.range[0] && percentage <= level.range[1]
    ) || STRESS_LEVELS[STRESS_LEVELS.length - 1];
  }

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
        NavigationService.navigateToLogin();
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

      const stressLevel = this.getStressLevel(data.stress_percentage);
      
      return {
        success: true,
        data: {
          stress_percentage: data.stress_percentage,
          state: stressLevel.state,
          description: stressLevel.description,
          suggestion: stressLevel.suggestion,
          consequences: stressLevel.consequences
        }
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