import React from 'react';
import { Text, TextSize } from '@/components/atoms/Text';

export type LoadingSpinnerProps = {
  message?: string;
  size?: TextSize;
};

/**
 * ローディングスピナーコンポーネント
 * @param props - LoadingSpinnerProps
 * @returns JSX.Element
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = '読み込み中...',
  size = 'base',
}) => {
  const spinnerSizeClass = {
    xs: 'w-3 h-3 border-2',
    sm: 'w-4 h-4 border-2',
    base: 'w-6 h-6 border-3',
    lg: 'w-8 h-8 border-4',
    xl: 'w-10 h-10 border-4',
    '2xl': 'w-12 h-12 border-4',
    '3xl': 'w-16 h-16 border-4',
  }[size];

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div
        className={`
          animate-spin rounded-full border-t-blue-500 border-solid
          ${spinnerSizeClass}
        `}
      ></div>
      <Text size={size} className="text-gray-600">
        {message}
      </Text>
    </div>
  );
};
