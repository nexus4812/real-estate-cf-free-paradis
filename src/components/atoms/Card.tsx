import React from 'react';

export type CardProps = {
  children: React.ReactNode;
  padding?: 'sm' | 'md' | 'lg' | 'none';
  shadow?: 'sm' | 'md' | 'lg' | 'none';
  border?: boolean;
  className?: string;
};

/**
 * カード枠コンポーネント
 * @param props - CardProps
 * @returns JSX.Element
 */
export const Card: React.FC<CardProps> = ({
  children,
  padding = 'md',
  shadow = 'md',
  border = true,
  className = '',
}) => {
  const paddingClass = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    none: 'p-0',
  }[padding];

  const shadowClass = {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    none: 'shadow-none',
  }[shadow];

  const borderClass = border ? 'border border-gray-200' : '';

  return (
    <div
      className={`bg-white rounded-lg ${shadowClass} ${borderClass} ${paddingClass} ${className}`}
      data-testid="card"
    >
      {children}
    </div>
  );
};
