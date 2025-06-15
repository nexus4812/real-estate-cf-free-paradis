import type { Story } from '@ladle/react';
import { BuildingAreaInput, BuildingAreaInputProps } from '@/components/molecules/BuildingAreaInput';

export const Default: Story<BuildingAreaInputProps> = (args) => (
  <BuildingAreaInput {...args} />
);
Default.args = {
  value: 100.0,
  onChange: (value) => console.log('建物面積変更:', value),
};

export const WithError: Story<BuildingAreaInputProps> = (args) => (
  <BuildingAreaInput {...args} />
);
WithError.args = {
  value: 0,
  onChange: (value) => console.log('建物面積変更:', value),
  error: '建物面積は必須です',
};
