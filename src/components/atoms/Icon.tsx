import React from 'react';
import * as HeroIcons from '@heroicons/react/24/outline'; // 24x24アウトラインアイコンを使用

export type IconName = string; // 型をstringに変更
export type IconSize = 'sm' | 'md' | 'lg' | 'xl';
export type IconColor = 'gray' | 'blue' | 'green' | 'red' | 'yellow' | 'black' | 'white';

export type IconProps = {
  name: IconName;
  size?: IconSize;
  color?: IconColor;
  className?: string;
};

/**
 * アイコンコンポーネント (Heroiconsを使用)
 * @param props - IconProps
 * @returns JSX.Element
 */
export const Icon: React.FC<IconProps> = ({
  name,
  size = 'md',
  color = 'black',
  className = '',
}) => {
  const HeroIcon = (HeroIcons as Record<string, React.FC<React.SVGProps<SVGSVGElement>>>)[name];

  if (!HeroIcon) {
    console.warn(`Icon "${name}" not found in Heroicons.`);
    return null; // または代替アイコンを表示
  }

  let sizeClasses = '';
  switch (size) {
    case 'sm':
      sizeClasses = 'h-4 w-4'; // 16px
      break;
    case 'md':
      sizeClasses = 'h-5 w-5'; // 20px (Heroicons default)
      break;
    case 'lg':
      sizeClasses = 'h-6 w-6'; // 24px
      break;
    case 'xl':
      sizeClasses = 'h-8 w-8'; // 32px
      break;
  }

  const textColorClass = (c: IconColor) => {
    switch (c) {
      case 'black': return 'text-black';
      case 'white': return 'text-white';
      case 'gray': return 'text-gray-500'; // Iconは通常Textより薄い色
      case 'blue': return 'text-blue-500';
      case 'green': return 'text-green-500';
      case 'red': return 'text-red-500';
      case 'yellow': return 'text-yellow-500';
      default: return 'text-black';
    }
  };

  return (
    <HeroIcon className={`${sizeClasses} ${textColorClass(color)} ${className}`} aria-hidden="true" />
  );
};
