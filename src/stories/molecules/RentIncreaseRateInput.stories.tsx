import type { Story } from '@ladle/react';
import { RentIncreaseRateInput, RentIncreaseRateInputProps } from '@/components/molecules/RentIncreaseRateInput';

export const Default: Story<RentIncreaseRateInputProps> = (args) => (
  <RentIncreaseRateInput {...args} />
);
Default.args = {
  value: 1,
  onChange: (value) => console.log('家賃上昇率変更:', value),
};

export const WithError: Story<RentIncreaseRateInputProps> = (args) => (
  <RentIncreaseRateInput {...args} />
);
WithError.args = {
  value: 0,
  onChange: (value) => console.log('家賃上昇率は必須です', value),
  error: '家賃上昇率は必須です',
};
