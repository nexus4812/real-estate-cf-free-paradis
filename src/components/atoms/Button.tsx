import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  size?: ButtonSize;
};

/**
 * ボタンコンポーネント
 * @param props - ButtonProps
 * @returns JSX.Element
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  type = 'button',
  size = 'md',
}) => {
  const baseClasses = 'font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  let variantClasses = '';
  let sizeClasses = '';

  switch (variant) {
    case 'primary':
      variantClasses = 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500';
      break;
    case 'secondary':
      variantClasses = 'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500';
      break;
    case 'danger':
      variantClasses = 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500';
      break;
  }

  switch (size) {
    case 'sm':
      sizeClasses = 'py-2 px-4 text-sm';
      break;
    case 'md':
      sizeClasses = 'py-3 px-6 text-base';
      break;
    case 'lg':
      sizeClasses = 'py-4 px-8 text-lg';
      break;
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );
};
