import React from 'react';

export type NumberInputProps = {
  value: number | string; // stringも許容
  onChange: (value: number | string) => void; // stringも許容
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
};

/**
 * 数値入力フィールドコンポーネント
 * @param props - NumberInputProps
 * @returns JSX.Element
 */
export const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
  min,
  max,
  step = 1,
  unit,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 入力値が数値に変換できる場合は数値として、そうでない場合は文字列として渡す
    const numValue = parseFloat(e.target.value);
    if (isNaN(numValue)) { // NaNの場合は0を返す
      onChange(0);
    } else {
      onChange(numValue);
    }
  };

  return (
    <div className="relative">
      <input
        type="number"
        value={value} // valueを直接使用
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        min={min}
        max={max}
        step={step}
        className={`
          input-field
          ${error ? 'border-red-500 focus:ring-red-500' : ''}
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
          ${unit ? 'pr-12' : ''}
        `}
      />
      {unit && (
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
          {unit}
        </span>
      )}
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};
