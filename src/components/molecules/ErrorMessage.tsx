import React from 'react';
import { Text } from '@/components/atoms/Text';
import { Icon } from '@/components/atoms/Icon';

export type ErrorMessageType = 'error' | 'warning' | 'info';

export type ErrorMessageProps = {
  message: string;
  type?: ErrorMessageType;
};

/**
 * エラーメッセージ表示コンポーネント
 * @param props - ErrorMessageProps
 * @returns JSX.Element
 */
export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  type = 'error',
}) => {
  const iconName = {
    error: 'ExclamationCircleIcon',
    warning: 'ExclamationTriangleIcon',
    info: 'InformationCircleIcon',
  }[type];

  const textColor = {
    error: 'text-red-600',
    warning: 'text-yellow-600',
    info: 'text-blue-600',
  }[type];

  const iconColor = {
    error: 'red',
    warning: 'yellow',
    info: 'blue',
  }[type];

  return (
    <div role="alert" className={`flex items-center p-3 rounded-md ${textColor} bg-${type}-50`}>
      {iconName && <Icon name={iconName as any} size="md" color={iconColor as any} className="mr-2" />}
      <Text size="sm" className="font-medium">
        {message}
      </Text>
    </div>
  );
};
