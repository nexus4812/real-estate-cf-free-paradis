import React from 'react';
import { NumberInput } from '@/components/atoms/NumberInput';
import { Label } from '@/components/atoms/Label';

export type BuildingAreaInputProps = {
  value: number;
  onChange: (value: number) => void;
  error?: string;
};

/**
 * 建物面積入力コンポーネント
 * @param props - BuildingAreaInputProps
 * @returns JSX.Element
 */
export const BuildingAreaInput: React.FC<BuildingAreaInputProps> = ({
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
      <Label htmlFor="buildingArea" required>
        建物面積
      </Label>
      <NumberInput
        id="buildingArea" // idを追加
        value={value}
        onChange={handleChange}
        placeholder="例: 100"
        error={error}
        min={0}
        step={1}
        unit="㎡"
      />
      <p className="text-sm text-gray-600">
        建物の延床面積を㎡単位で入力してください
      </p>
    </div>
  );
};
