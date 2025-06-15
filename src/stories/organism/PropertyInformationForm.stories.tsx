import type { Story } from '@ladle/react';
import { PropertyInformationForm, PropertyInformationFormProps } from '@/components/organism/PropertyInformationForm';
import { useState } from 'react';

export const Default: Story<PropertyInformationFormProps> = () => {
  const [state, setState] = useState({
    propertyPrice: 30000000,
    surfaceYield: 5,
    structure: '鉄筋コンクリート造',
    constructionYear: 2000,
    buildingArea: 100,
  });

  const handleChange = (field: string, value: any) => {
    setState((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <PropertyInformationForm
      propertyPrice={state.propertyPrice}
      surfaceYield={state.surfaceYield}
      structure={state.structure}
      constructionYear={state.constructionYear}
      buildingArea={state.buildingArea}
      onPropertyPriceChange={(value) => handleChange('propertyPrice', value)}
      onSurfaceYieldChange={(value) => handleChange('surfaceYield', value)}
      onStructureChange={(value) => handleChange('structure', value)}
      onConstructionYearChange={(value) => handleChange('constructionYear', value)}
      onBuildingAreaChange={(value) => handleChange('buildingArea', value)}
      errors={{}}
    />
  );
};

export const WithErrors: Story<PropertyInformationFormProps> = () => {
  const [state, setState] = useState({
    propertyPrice: 0,
    surfaceYield: 0,
    structure: '',
    constructionYear: 0,
    buildingArea: 0,
  });

  const handleChange = (field: string, value: any) => {
    setState((prev) => ({ ...prev, [field]: value }));
  };

  const errors = {
    propertyPrice: '物件価格は必須です',
    surfaceYield: '表面利回りは必須です',
    structure: '建物構造は必須です',
    constructionYear: '築年は必須です',
    buildingArea: '建物面積は必須です',
  };

  return (
    <PropertyInformationForm
      propertyPrice={state.propertyPrice}
      surfaceYield={state.surfaceYield}
      structure={state.structure}
      constructionYear={state.constructionYear}
      buildingArea={state.buildingArea}
      onPropertyPriceChange={(value) => handleChange('propertyPrice', value)}
      onSurfaceYieldChange={(value) => handleChange('surfaceYield', value)}
      onStructureChange={(value) => handleChange('structure', value)}
      onConstructionYearChange={(value) => handleChange('constructionYear', value)}
      onBuildingAreaChange={(value) => handleChange('buildingArea', value)}
      errors={errors}
    />
  );
};
