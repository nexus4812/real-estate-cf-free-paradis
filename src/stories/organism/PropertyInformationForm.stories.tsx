import type { Story } from '@ladle/react';
import { PropertyInformationForm, PropertyInformationFormProps } from '@/components/organism/PropertyInformationForm';

export const Default: Story<PropertyInformationFormProps> = (args) => (
  <div className="max-w-2xl mx-auto p-4">
    <PropertyInformationForm {...args} />
  </div>
);
Default.args = {
  propertyPrice: 30000000,
  surfaceYield: 5.0,
  structure: '鉄筋コンクリート造',
  constructionYear: 2000,
  buildingArea: 100.0,
  onPropertyPriceChange: (value) => console.log('物件価格変更:', value),
  onSurfaceYieldChange: (value) => console.log('表面利回り変更:', value),
  onStructureChange: (value) => console.log('構造変更:', value),
  onConstructionYearChange: (value) => console.log('築年変更:', value),
  onBuildingAreaChange: (value) => console.log('建物面積変更:', value),
  errors: {},
};

export const WithErrors: Story<PropertyInformationFormProps> = (args) => (
  <div className="max-w-2xl mx-auto p-4">
    <PropertyInformationForm {...args} />
  </div>
);
WithErrors.args = {
  propertyPrice: 0,
  surfaceYield: 0,
  structure: '',
  constructionYear: 0,
  buildingArea: 0,
  onPropertyPriceChange: (value) => console.log('物件価格変更:', value),
  onSurfaceYieldChange: (value) => console.log('表面利回り変更:', value),
  onStructureChange: (value) => console.log('構造変更:', value),
  onConstructionYearChange: (value) => console.log('築年変更:', value),
  onBuildingAreaChange: (value) => console.log('建物面積変更:', value),
  errors: {
    propertyPrice: '物件価格は必須です',
    surfaceYield: '表面利回りは必須です',
    structure: '構造は必須です',
    constructionYear: '築年は必須です',
    buildingArea: '建物面積は必須です',
  },
};
