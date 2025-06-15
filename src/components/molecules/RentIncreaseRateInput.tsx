import React from 'react';
import { NumberInput } from '@/components/atoms/NumberInput';
import { Label } from '@/components/atoms/Label';

export type RentIncreaseRateInputProps = {
  value: number;
  onChange: (value: number) => void;
  error?: string;
};

/**
 * 家賃上昇率入力コンポーネント
 * @param props - RentIncreaseRateInputProps
 * @returns JSX.Element
 */
export const RentIncreaseRateInput: React.FC<RentIncreaseRateInputProps> = ({
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
      <Label htmlFor="rentIncreaseRate" required>
        家賃上昇率
      </Label>
      <NumberInput
        value={value}
        onChange={handleChange}
        placeholder="例: 1.0"
        error={error}
        min={-10}
        max={10}
        step={0.1}
        unit="%"
      />
      <p className="text-sm text-gray-600">
        年間の家賃上昇率を%で入力してください
      </p>
    </div>
  );
};
