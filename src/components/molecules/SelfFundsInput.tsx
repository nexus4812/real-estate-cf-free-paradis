import React from 'react';
import { NumberInput } from '@/components/atoms/NumberInput';
import { Label } from '@/components/atoms/Label';

export type SelfFundsInputProps = {
  value: number;
  onChange: (value: number) => void;
  error?: string;
};

/**
 * 自己資金入力コンポーネント
 * @param props - SelfFundsInputProps
 * @returns JSX.Element
 */
export const SelfFundsInput: React.FC<SelfFundsInputProps> = ({
  value,
  onChange,
  error,
}) => {
  const handleChange = (inputValue: number | string) => {
    if (typeof inputValue === 'number') {
      // 万円単位での入力を円に変換
      onChange(inputValue * 10000);
    } else if (inputValue === '') {
      onChange(0);
    }
  };

  const displayValue = value / 10000; // 円を万円に変換して表示

  return (
    <div className="space-y-2">
      <Label htmlFor="selfFunds" required>
        自己資金
      </Label>
      <NumberInput
        id="selfFunds" // idを追加
        value={displayValue}
        onChange={handleChange}
        placeholder="例: 500"
        error={error}
        min={0}
        step={10}
        unit="万円"
      />
      <p className="text-sm text-gray-600">
        物件購入に充てる自己資金を万円単位で入力してください
      </p>
    </div>
  );
};
