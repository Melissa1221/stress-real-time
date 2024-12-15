import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../shared/utils/routes';
import CardQuestion from '../components/CardQuestion';
import { questions2 } from '../shared/data/questions2';
import { QuestionnaireService } from '../services/questionnaire.service';

const Questionnaire2 = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(new Array(questions2.length).fill(''));
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleNext = async () => {
    // Save the answer
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = questions2[currentQuestionIndex].options[parseInt(selectedOption)];
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions2.length - 1) {
      // Move to next question
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(''); // Reset selection for next question
    } else {
      try {
        const userStr = localStorage.getItem('user');
        if (!userStr) {
          setError('Sesión no válida');
          navigate(ROUTES.LOGIN);
          return;
        }

        const user = JSON.parse(userStr);
        if (!user.token) {
          setError('Token no encontrado');
          navigate(ROUTES.LOGIN);
          return;
        }

        // Send answers to backend
        const response = await QuestionnaireService.saveAnswers(newAnswers, user.token);
        
        if (response.success) {
          // Save stress level from backend response
          if (response.stress_level !== undefined) {
            localStorage.setItem('questionnaireStress2', response.stress_level.toString());
          }
          navigate(ROUTES.RESULTS);
        } else {
          if (response.error?.includes('Sesión expirada')) {
            navigate(ROUTES.LOGIN);
          } else {
            setError(response.error || 'Error al guardar las respuestas');
          }
        }
      } catch {
        setError('Error al procesar el cuestionario');
      }
    }
  };

  const currentQuestion = questions2[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions2.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <CardQuestion
        title="Escala de Estrés Percibido"
        question={currentQuestion.text}
        options={currentQuestion.options.map((text, index) => ({
          id: index.toString(),
          text
        }))}
        progress={progress}
        selectedOption={selectedOption}
        onOptionSelect={handleOptionSelect}
        onNext={handleNext}
        error={error}
      />
    </div>
  );
};

export default Questionnaire2;
