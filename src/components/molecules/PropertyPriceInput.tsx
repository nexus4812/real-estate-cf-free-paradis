import React from 'react';
import { NumberInput } from '@/components/atoms/NumberInput';
import { Label } from '@/components/atoms/Label';

export type PropertyPriceInputProps = {
  value: number;
  onChange: (value: number) => void;
  error?: string;
};

/**
 * 物件価格入力コンポーネント
 * @param props - PropertyPriceInputProps
 * @returns JSX.Element
 */
export const PropertyPriceInput: React.FC<PropertyPriceInputProps> = ({
  value,
  onChange,
  error,
}) => {
  const handleChange = (inputValue: number | string) => {
    if (typeof inputValue === 'number') {
      // 万円単位での入力を円に変換
      onChange(inputValue * 10000);
    } else if (inputValue === '') {
      onChange(0); // 空文字列の場合は0を渡す
    }
    // 文字列の場合は何もしない（NumberInput側で数値に変換できない文字列はそのまま渡されるため）
  };

  const displayValue = value / 10000; // 円を万円に変換して表示

  return (
    <div className="space-y-2">
      <Label htmlFor="propertyPrice" required>
        物件価格
      </Label>
      <NumberInput
        value={displayValue}
        onChange={handleChange}
        placeholder="例: 3000"
        error={error}
        min={0}
        step={100}
        unit="万円"
      />
      <p className="text-sm text-gray-600">
        物件の購入価格を万円単位で入力してください
      </p>
    </div>
  );
};
