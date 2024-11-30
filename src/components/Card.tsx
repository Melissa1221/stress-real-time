import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div 
      className={`
        bg-white 
        rounded-2xl 
        shadow-md 
        p-8 
        w-full 
        max-w-[600px] 
        mx-auto
        font-roboto
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;