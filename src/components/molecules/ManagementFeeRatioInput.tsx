import React from 'react';
import { NumberInput } from '@/components/atoms/NumberInput';
import { Label } from '@/components/atoms/Label';

export type ManagementFeeRatioInputProps = {
  value: number;
  onChange: (value: number) => void;
  error?: string;
};

/**
 * 管理費率入力コンポーネント
 * @param props - ManagementFeeRatioInputProps
 * @returns JSX.Element
 */
export const ManagementFeeRatioInput: React.FC<ManagementFeeRatioInputProps> = ({
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
      <Label htmlFor="managementFeeRatio" required>
        管理費率
      </Label>
      <NumberInput
        id="managementFeeRatio" // idを追加
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
        年間の管理費を家賃収入に対する割合で入力してください
      </p>
    </div>
  );
};
