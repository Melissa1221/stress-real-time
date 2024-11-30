import { FC } from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  text: string;
  color?: 'primary' | 'social' | 'success' | 'info';
  route?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  text,
  color = 'primary',
  route,
  onClick,
  type = 'button',
  fullWidth = true,
  disabled = false,
}) => {
  const baseStyles = `
    px-4 
    py-2 
    rounded-md 
    font-roboto 
    font-medium 
    transition-all 
    duration-200 
    text-center
    block
    ${fullWidth ? 'w-full' : 'w-auto'}
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90 active:scale-95'}
  `;

  const colorStyles = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600',
    social: 'bg-social-500 text-white hover:bg-social-600',
    success: 'bg-success-500 text-white hover:bg-success-600',
    info: 'bg-info-500 text-white hover:bg-info-600',
  };

  const buttonClasses = `${baseStyles} ${colorStyles[color]}`;

  if (route) {
    return (
      <div className={fullWidth ? 'w-full' : 'w-auto'}>
        <Link 
          to={route} 
          className={buttonClasses}
        >
          {text}
        </Link>
      </div>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
    >
      {text}
    </button>
  );
};

export default Button;