import type { Story } from '@ladle/react';
import { RepairCostRatioInput, RepairCostRatioInputProps } from '@/components/molecules/RepairCostRatioInput';

export const Default: Story<RepairCostRatioInputProps> = (args) => (
  <RepairCostRatioInput {...args} />
);
Default.args = {
  value: 1.0,
  onChange: (value) => console.log('修繕費率変更:', value),
};

export const WithError: Story<RepairCostRatioInputProps> = (args) => (
  <RepairCostRatioInput {...args} />
);
WithError.args = {
  value: 0,
  onChange: (value) => console.log('修繕費率変更:', value),
  error: '修繕費率は必須です',
};
