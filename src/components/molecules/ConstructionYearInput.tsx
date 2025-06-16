import React from 'react';
import { NumberInput } from '@/components/atoms/NumberInput';
import { Label } from '@/components/atoms/Label';

export type ConstructionYearInputProps = {
  value: number;
  onChange: (value: number) => void;
  error?: string | undefined;
};

/**
 * 築年数入力コンポーネント
 * @param props - ConstructionYearInputProps
 * @returns JSX.Element
 */
export const ConstructionYearInput: React.FC<ConstructionYearInputProps> = ({
  value,
  onChange,
  error,
}) => {
  const currentYear = new Date().getFullYear();
  const maxYear = currentYear; // 未来の年は入力できない
  const minYear = 1900; // 妥当な最小値

  const handleChange = (inputValue: number | string) => {
    if (typeof inputValue === 'number') {
      onChange(inputValue);
    } else if (inputValue === '') {
      onChange(0);
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="constructionYear" required>
        築年
      </Label>
      <NumberInput
        id="constructionYear" // idを追加
        value={value}
        onChange={handleChange}
        placeholder={`例: ${currentYear - 10}`}
        error={error}
        min={minYear}
        max={maxYear}
        step={1}
        unit="年"
      />
      <p className="text-sm text-gray-600">
        建物の建築年を入力してください（例: {currentYear - 10}年築）
      </p>
    </div>
  );
};
