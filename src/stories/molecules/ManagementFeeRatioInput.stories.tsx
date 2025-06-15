import type { Story } from '@ladle/react';
import { ManagementFeeRatioInput, ManagementFeeRatioInputProps } from '@/components/molecules/ManagementFeeRatioInput';

export const Default: Story<ManagementFeeRatioInputProps> = (args) => (
  <ManagementFeeRatioInput {...args} />
);
Default.args = {
  value: 5.0,
  onChange: (value) => console.log('管理費率変更:', value),
};

export const WithError: Story<ManagementFeeRatioInputProps> = (args) => (
  <ManagementFeeRatioInput {...args} />
);
WithError.args = {
  value: 0,
  onChange: (value) => console.log('管理費率変更:', value),
  error: '管理費率は必須です',
};
