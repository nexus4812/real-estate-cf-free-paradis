import React from 'react';

export type LabelProps = {
  children: React.ReactNode;
  htmlFor?: string;
  required?: boolean;
};

/**
 * ラベルコンポーネント
 * @param props - LabelProps
 * @returns JSX.Element
 */
export const Label: React.FC<LabelProps> = ({
  children,
  htmlFor,
  required = false,
}) => {
  return (
    <label htmlFor={htmlFor} className={`label ${required ? 'label-required' : ''}`}>
      {children}
    </label>
  );
};
