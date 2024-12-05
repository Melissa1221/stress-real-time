import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../shared/utils/routes';
import CardQuestion from '../components/CardQuestion';
import { questions2, calculateStressPercentage2 } from '../shared/data/questions2';

const Questionnaire2 = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(new Array(questions2.length).fill(''));
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleNext = () => {
    // Save the answer
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = questions2[currentQuestionIndex].options[parseInt(selectedOption)];
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions2.length - 1) {
      // Move to next question
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(''); // Reset selection for next question
    } else {
      // Calculate final score and save it
      const stressPercentage = calculateStressPercentage2(newAnswers);
      localStorage.setItem('questionnaireStress2', stressPercentage.toString());
      
      // Navigate to results page
      navigate(ROUTES.RESULTS);
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
      />
    </div>
  );
};

export default Questionnaire2;
