import React from 'react';
import professionalLogo from './woxwaffy-professional-logo.svg';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'color';
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const WoxwaffyLogo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'w-36 sm:w-40',
    md: 'w-44',
    lg: 'w-52 md:w-60',
    xl: 'w-64 md:w-72',
  };

  return (
    <img
      src={professionalLogo}
      width={1650}
      height={264}
      alt="Woxwaffy"
      className={`block h-auto select-none ${sizeClasses[size]} ${className}`}
    />
  );
};
