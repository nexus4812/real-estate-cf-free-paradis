import React from 'react';

export type TextInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string | undefined;
  disabled?: boolean;
  type?: 'text' | 'email' | 'password' | 'url';
};

/**
 * テキスト入力フィールドコンポーネント
 * @param props - TextInputProps
 * @returns JSX.Element
 */
export const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
  type = 'text',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          input-field
          ${error ? 'border-red-500 focus:ring-red-500' : ''}
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
        `}
      />
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};
