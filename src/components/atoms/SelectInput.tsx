import React from 'react';

export type SelectOption = {
  value: string;
  label: string;
};

export type SelectInputProps = {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  error?: string | undefined;
  disabled?: boolean;
};

/**
 * セレクトボックスコンポーネント
 * @param props - SelectInputProps
 * @returns JSX.Element
 */
export const SelectInput: React.FC<SelectInputProps> = ({
  id,
  value,
  onChange,
  options,
  placeholder,
  error,
  disabled = false,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={`
          select-field
          ${error ? 'border-red-500 focus:ring-red-500' : ''}
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
        `}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};
