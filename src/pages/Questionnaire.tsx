import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../shared/utils/routes';
import CardQuestion from '../components/CardQuestion';
import { questions, calculateStressPercentage } from '../shared/data/questions';

const Questionnaire = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(new Array(questions.length).fill(''));
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleNext = () => {
    // Save the answer
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = questions[currentQuestionIndex].options[parseInt(selectedOption)];
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      // Move to next question
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(''); // Reset selection for next question
    } else {
      // Calculate final score and save it
      const stressPercentage = calculateStressPercentage(newAnswers);
      localStorage.setItem('questionnaireStress', stressPercentage.toString());
      
      // Navigate to results page instead of history
      navigate(ROUTES.RESULTS);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <CardQuestion
        title="Cuestionario de Estrés"
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

export default Questionnaire;