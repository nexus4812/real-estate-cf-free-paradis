import type { Story } from '@ladle/react';
import { StructureSelect, StructureSelectProps } from '@/components/molecules/StructureSelect';
import { RC } from '@/domain/property/buildingStructure';

export const Default: Story<StructureSelectProps> = (args) => (
  <StructureSelect {...args} />
);
Default.args = {
  value: new RC().label(),
  onChange: (value) => console.log('構造変更:', value),
};

export const WithError: Story<StructureSelectProps> = (args) => (
  <StructureSelect {...args} />
);
WithError.args = {
  value: '',
  onChange: (value) => console.log('構造変更:', value),
  error: '構造は必須です',
};
