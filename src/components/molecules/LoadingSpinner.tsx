import React from 'react';
import { Text, TextSize } from '@/components/atoms/Text';

export type LoadingSpinnerProps = {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
};

/**
 * ローディングスピナーコンポーネント
 * @param props - LoadingSpinnerProps
 * @returns JSX.Element
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = '読み込み中...',
  size = 'md',
}) => {
  const spinnerSizeClass = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-3',
    lg: 'w-8 h-8 border-4',
  }[size];

  const textSizeMap = {
    sm: 'sm',
    md: 'base',
    lg: 'lg',
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div
        className={`
          animate-spin rounded-full border-t-blue-500 border-solid
          ${spinnerSizeClass}
        `}
      ></div>
      <Text size={textSizeMap[size]} className="text-gray-600">
        {message}
      </Text>
    </div>
  );
};
