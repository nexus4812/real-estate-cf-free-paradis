import React from 'react';
import { NumberInput } from '@/components/atoms/NumberInput';
import { Label } from '@/components/atoms/Label';

export type VacancyRateInputProps = {
  value: number;
  onChange: (value: number) => void;
  error?: string;
};

/**
 * 空室率入力コンポーネント
 * @param props - VacancyRateInputProps
 * @returns JSX.Element
 */
export const VacancyRateInput: React.FC<VacancyRateInputProps> = ({
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
      <Label htmlFor="vacancyRate" required>
        空室率
      </Label>
      <NumberInput
        value={value}
        onChange={handleChange}
        placeholder="例: 5.0"
        error={error}
        min={0}
        max={100}
        step={0.1}
        unit="%"
      />
      <p className="text-sm text-gray-600">
        年間の平均空室率を%で入力してください
      </p>
    </div>
  );
};
