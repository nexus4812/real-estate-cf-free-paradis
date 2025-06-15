import React from 'react';

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'gray';
export type BadgeSize = 'sm' | 'md' | 'lg';

export type BadgeProps = {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
};

/**
 * バッジコンポーネント
 * @param props - BadgeProps
 * @returns JSX.Element
 */
export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'gray',
  size = 'md',
  className = '',
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-full font-medium';
  let variantClasses = '';
  let sizeClasses = '';

  switch (variant) {
    case 'primary':
      variantClasses = 'bg-blue-100 text-blue-800';
      break;
    case 'success':
      variantClasses = 'bg-green-100 text-green-800';
      break;
    case 'warning':
      variantClasses = 'bg-yellow-100 text-yellow-800';
      break;
    case 'danger':
      variantClasses = 'bg-red-100 text-red-800';
      break;
    case 'info':
      variantClasses = 'bg-indigo-100 text-indigo-800';
      break;
    case 'gray':
      variantClasses = 'bg-gray-100 text-gray-800';
      break;
  }

  switch (size) {
    case 'sm':
      sizeClasses = 'px-2 py-0.5 text-xs';
      break;
    case 'md':
      sizeClasses = 'px-2.5 py-0.5 text-sm';
      break;
    case 'lg':
      sizeClasses = 'px-3 py-1 text-base';
      break;
  }

  return (
    <span className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}>
      {children}
    </span>
  );
};
