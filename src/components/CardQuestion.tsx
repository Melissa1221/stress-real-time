import React from 'react';
import Card from './Card';
import Button from './Button';

interface Option {
  id: string;
  text: string;
}

interface CardQuestionProps {
  title: string;
  question: string;
  options: Option[];
  progress: number;
  selectedOption?: string;
  onOptionSelect: (optionId: string) => void;
  onNext: () => void;
}

const CardQuestion: React.FC<CardQuestionProps> = ({
  title,
  question,
  options,
  progress,
  selectedOption,
  onOptionSelect,
  onNext,
}) => {
  return (
    <Card>
      <div className="flex flex-col gap-6">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-2xl font-medium mb-2">
            {title}
          </h1>
        </div>

        {/* Question */}
        <div>
          <p className="text-gray-700 text-lg">
            {question}
          </p>
        </div>

        {/* Options */}
        <div className="flex flex-col gap-3">
          {options.map((option) => (
            <label
              key={option.id}
              className={`
                flex items-center gap-3 p-3 rounded-md border cursor-pointer
                transition-all duration-200
                ${selectedOption === option.id 
                  ? 'border-success-500 bg-success-50' 
                  : 'border-gray-300 hover:border-gray-400'
                }
              `}
            >
              <input
                type="radio"
                name="question-option"
                value={option.id}
                checked={selectedOption === option.id}
                onChange={() => onOptionSelect(option.id)}
                className="w-4 h-4 text-success-500 focus:ring-success-500"
              />
              <span className="text-gray-700">{option.text}</span>
            </label>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
          <div
            className="bg-success-500 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Next Button */}
        <Button
          text="Siguiente"
          color="info"
          onClick={onNext}
          disabled={!selectedOption}
        />
      </div>
    </Card>
  );
};

export default CardQuestion;
