import React from 'react';

export type TextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';
export type TextColor = 'gray' | 'blue' | 'green' | 'red' | 'yellow' | 'black' | 'white';
export type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold';
export type TextAlign = 'left' | 'center' | 'right' | 'justify';

export type TextProps = {
  children: React.ReactNode;
  size?: TextSize;
  color?: TextColor;
  weight?: TextWeight;
  align?: TextAlign;
  className?: string; // Tailwind CSSのクラスを直接渡せるように追加
};

/**
 * テキスト表示コンポーネント
 * @param props - TextProps
 * @returns JSX.Element
 */
export const Text: React.FC<TextProps> = ({
  children,
  size = 'base',
  color = 'black',
  weight = 'normal',
  align = 'left',
  className = '',
}) => {
  const textColorClass = (c: TextColor) => {
    switch (c) {
      case 'black': return 'text-black';
      case 'white': return 'text-white';
      case 'gray': return 'text-gray-700';
      case 'blue': return 'text-blue-700';
      case 'green': return 'text-green-700';
      case 'red': return 'text-red-700';
      case 'yellow': return 'text-yellow-700';
      default: return 'text-black';
    }
  };

  return (
    <p className={`
      text-${size}
      ${textColorClass(color)}
      font-${weight}
      text-${align}
      ${className}
    `}>
      {children}
    </p>
  );
};
