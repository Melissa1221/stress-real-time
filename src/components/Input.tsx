import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  validation?: {
    pattern?: RegExp;
    message?: string;
  };
  fullWidth?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  validation,
  fullWidth = true,
  className = '',
  ...props
}) => {
  const [localError, setLocalError] = React.useState<string>('');

  const handleValidation = (value: string) => {
    if (validation?.pattern && !validation.pattern.test(value)) {
      setLocalError(validation.message || 'Invalid format');
    } else {
      setLocalError('');
    }
  };

  const inputClasses = `
    w-full
    px-4
    py-2
    rounded-md
    border
    font-roboto
    text-base
    placeholder:text-gray-400
    focus:outline-none
    focus:ring-2
    transition-all
    duration-200
    ${error || localError 
      ? 'border-primary-500 focus:ring-primary-200' 
      : 'border-gray-300 focus:ring-info-200 focus:border-info-500'
    }
    ${props.disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
  `;

  const containerClasses = `
    flex 
    flex-col 
    gap-1
    ${fullWidth ? 'w-full' : 'w-auto'}
    ${className}
  `;

  return (
    <div className={containerClasses}>
      {label && (
        <label className="text-sm font-roboto font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        {...props}
        className={inputClasses}
        onChange={(e) => {
          if (validation) handleValidation(e.target.value);
          props.onChange?.(e);
        }}
      />
      {(error || localError) && (
        <span className="text-xs text-primary-500 font-roboto">
          {error || localError}
        </span>
      )}
    </div>
  );
};

export default Input;