import type { Story } from '@ladle/react';
import { StructureSelect, StructureSelectProps } from '@/components/molecules/StructureSelect';
import { allBuildingStructures } from '@/domain/property/buildingStructure';

const options = allBuildingStructures.map(s => ({ value: s.label(), label: s.label() }));

export const Default: Story<StructureSelectProps> = (args) => (
  <StructureSelect {...args} />
);
Default.args = {
  value: options[0].value,
  onChange: (value) => console.log('構造変更:', value),
  options: options,
};

export const WithError: Story<StructureSelectProps> = (args) => (
  <StructureSelect {...args} />
);
WithError.args = {
  value: '',
  onChange: (value) => console.log('構造変更:', value),
  options: options,
  error: '構造は必須です',
};
