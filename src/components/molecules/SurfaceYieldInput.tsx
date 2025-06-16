import React from 'react';
import { NumberInput } from '@/components/atoms/NumberInput';
import { Label } from '@/components/atoms/Label';

export type SurfaceYieldInputProps = {
  value: number;
  onChange: (value: number) => void;
  error?: string | undefined;
};

/**
 * 表面利回り入力コンポーネント
 * @param props - SurfaceYieldInputProps
 * @returns JSX.Element
 */
export const SurfaceYieldInput: React.FC<SurfaceYieldInputProps> = ({
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
      <Label htmlFor="surfaceYield" required>
        表面利回り
      </Label>
      <NumberInput
        id="surfaceYield" // idを追加
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
        物件の表面利回りを入力してください（例: 5.0%）
      </p>
    </div>
  );
};
