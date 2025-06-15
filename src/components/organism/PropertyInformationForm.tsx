import React from 'react';
import { PropertyPriceInput } from '@/components/molecules/PropertyPriceInput';
import { SurfaceYieldInput } from '@/components/molecules/SurfaceYieldInput';
import { StructureSelect } from '@/components/molecules/StructureSelect';
import { ConstructionYearInput } from '@/components/molecules/ConstructionYearInput';
import { BuildingAreaInput } from '@/components/molecules/BuildingAreaInput';
import { allBuildingStructures } from '@/domain/property/buildingStructure';
import { Card } from '@/components/atoms/Card'; // Cardコンポーネントをインポート

export type PropertyInformationFormProps = {
  propertyPrice: number;
  surfaceYield: number;
  structure: string;
  constructionYear: number;
  buildingArea: number;
  onPropertyPriceChange: (value: number) => void;
  onSurfaceYieldChange: (value: number) => void;
  onStructureChange: (value: string) => void;
  onConstructionYearChange: (value: number) => void;
  onBuildingAreaChange: (value: number) => void;
  errors: Record<string, string | undefined>; // エラー型を修正
};

/**
 * 物件情報入力フォームコンポーネント
 * @param props - PropertyInformationFormProps
 * @returns JSX.Element
 */
export const PropertyInformationForm: React.FC<PropertyInformationFormProps> = ({
  propertyPrice,
  surfaceYield,
  structure,
  constructionYear,
  buildingArea,
  onPropertyPriceChange,
  onSurfaceYieldChange,
  onStructureChange,
  onConstructionYearChange,
  onBuildingAreaChange,
  errors,
}) => {
  return (
    <Card> {/* Cardコンポーネントでラップ */}
      <h3 className="section-title">物件情報</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PropertyPriceInput
          value={propertyPrice}
          onChange={onPropertyPriceChange}
          error={errors.propertyPrice}
        />
        <SurfaceYieldInput
          value={surfaceYield}
          onChange={onSurfaceYieldChange}
          error={errors.surfaceYield}
        />
        <StructureSelect
          value={structure}
          onChange={onStructureChange}
          error={errors.structure}
          options={allBuildingStructures.map(s => ({ value: s.label(), label: s.label() }))}
        />
        <ConstructionYearInput
          value={constructionYear}
          onChange={onConstructionYearChange}
          error={errors.constructionYear}
        />
        <div className="md:col-span-2">
          <BuildingAreaInput
            value={buildingArea}
            onChange={onBuildingAreaChange}
            error={errors.buildingArea}
          />
        </div>
      </div>
    </Card>
  );
};
