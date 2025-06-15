import React from 'react';
import { SelectInput } from '@/components/atoms/SelectInput';
import { Label } from '@/components/atoms/Label';
import { allBuildingStructures } from '@/domain/property/buildingStructure';

export type StructureSelectProps = {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  options: { value: string; label: string }[];
};

/**
 * 建物構造選択コンポーネント
 * @param props - StructureSelectProps
 * @returns JSX.Element
 */
export const StructureSelect: React.FC<StructureSelectProps> = ({
  value,
  onChange,
  error,
}) => {
  const options = allBuildingStructures.map((structure) => ({
    value: structure.label(), // または構造を識別するユニークな値
    label: structure.label(),
  }));

  return (
    <div className="space-y-2">
      <Label htmlFor="structure" required>
        建物構造
      </Label>
      <SelectInput
        id="structure"
        value={value}
        onChange={onChange}
        options={options}
        placeholder="選択してください"
        error={error}
      />
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};
