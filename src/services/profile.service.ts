import { API_URL } from '../config/env';

interface ProfileData {
  full_name: string;
  age: number;
  gender: string;
  marital_status: string;
  occupation: string;
}

export class ProfileService {
  static async saveProfile(profileData: ProfileData, token: string): Promise<{ success: boolean; error?: string }> {
    try {
      if (!token) {
        return {
          success: false,
          error: 'No hay token de autenticación'
        };
      }

      const response = await fetch(`${API_URL}/users/profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.replace('Bearer ', '')}`
        },
        body: JSON.stringify(profileData),
      });

      if (response.status === 401) {
        // Token expirado o inválido
        localStorage.removeItem('user'); // Limpiar sesión
        window.location.href = '/'; // Redirigir al login
        return {
          success: false,
          error: 'Sesión expirada. Por favor, inicia sesión nuevamente.'
        };
      }

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.detail || 'Error al guardar el perfil.'
        };
      }

      return {
        success: true
      };
    } catch (error) {
      console.error('Error saving profile:', error);
      return {
        success: false,
        error: "Error al conectar con el servidor. Intenta nuevamente."
      };
    }
  }
} 