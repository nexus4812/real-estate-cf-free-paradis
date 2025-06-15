import React from 'react';
import { NumberInput } from '@/components/atoms/NumberInput';
import { Label } from '@/components/atoms/Label';

export type InterestRateInputProps = {
  value: number;
  onChange: (value: number) => void;
  error?: string | undefined;
};

/**
 * 金利入力コンポーネント
 * @param props - InterestRateInputProps
 * @returns JSX.Element
 */
export const InterestRateInput: React.FC<InterestRateInputProps> = ({
  value,
  onChange,
  error,
}) => {
  const handleChange = (inputValue: number | string) => {
    if (typeof inputValue === 'number') {
      onChange(inputValue);
    } else if (inputValue === '') {
      onChange(0);
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="interestRate" required>
        金利
      </Label>
      <NumberInput
        value={value}
        onChange={handleChange}
        placeholder="例: 1.5"
        error={error}
        min={0}
        max={100}
        step={0.01}
        unit="%"
      />
      <p className="text-sm text-gray-600">
        借入金利を年率で入力してください（例: 1.5%）
      </p>
    </div>
  );
};
