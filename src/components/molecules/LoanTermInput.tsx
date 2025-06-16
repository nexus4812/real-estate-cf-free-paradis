import React from 'react';
import { NumberInput } from '@/components/atoms/NumberInput';
import { Label } from '@/components/atoms/Label';

export type LoanTermInputProps = {
  value: number;
  onChange: (value: number) => void;
  error?: string;
};

/**
 * 借入期間入力コンポーネント
 * @param props - LoanTermInputProps
 * @returns JSX.Element
 */
export const LoanTermInput: React.FC<LoanTermInputProps> = ({
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
      <Label htmlFor="loanTerm" required>
        借入期間
      </Label>
      <NumberInput
        id="loanTerm" // idを追加
        value={value}
        onChange={handleChange}
        placeholder="例: 30"
        error={error}
        min={1}
        max={50}
        step={1}
        unit="年"
      />
      <p className="text-sm text-gray-600">
        借入期間を年単位で入力してください
      </p>
    </div>
  );
};
