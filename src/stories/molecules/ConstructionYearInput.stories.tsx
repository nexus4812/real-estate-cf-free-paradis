import type { Story } from '@ladle/react';
import { ConstructionYearInput, ConstructionYearInputProps } from '@/components/molecules/ConstructionYearInput';

export const Default: Story<ConstructionYearInputProps> = (args) => (
  <ConstructionYearInput {...args} />
);
Default.args = {
  value: 2000,
  onChange: (value) => console.log('築年変更:', value),
};

export const WithError: Story<ConstructionYearInputProps> = (args) => (
  <ConstructionYearInput {...args} />
);
WithError.args = {
  value: 0,
  onChange: (value) => console.log('築年変更:', value),
  error: '築年は必須です',
};
