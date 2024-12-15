import { API_URL } from '../config/env';

interface QuestionnaireResponse {
  success: boolean;
  error?: string;
  stress_level?: number;
}

interface QuestionnaireAnswers {
  answers: {
    question_number: number;
    answer: number;
  }[];
}

const answerValues: Record<string, number> = {
  "Nunca": 0,
  "Casi nunca": 1,
  "De vez en cuando": 2,
  "A menudo": 3,
  "Muy a menudo": 4
};

export class QuestionnaireService {
  static async saveAnswers(answers: string[], token: string): Promise<QuestionnaireResponse> {
    try {
      if (!token) {
        return {
          success: false,
          error: 'No hay token de autenticación'
        };
      }

      // Transformar el array de respuestas al formato requerido
      const formattedAnswers: QuestionnaireAnswers = {
        answers: answers.map((answer, index) => ({
          question_number: index + 1,
          answer: answerValues[answer] || 0
        }))
      };

      const response = await fetch(`${API_URL}/questionnaire/answers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.replace('Bearer ', '')}`
        },
        body: JSON.stringify(formattedAnswers),
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
          error: data.detail || 'Error al guardar las respuestas.'
        };
      }

      return {
        success: true,
        stress_level: data.stress_level
      };
    } catch (error) {
      console.error('Error saving answers:', error);
      return {
        success: false,
        error: "Error al conectar con el servidor. Intenta nuevamente."
      };
    }
  }
} 