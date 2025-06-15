import type { Story } from '@ladle/react';
import { InterestRateInput, InterestRateInputProps } from '@/components/molecules/InterestRateInput';

export const Default: Story<InterestRateInputProps> = (args) => (
  <InterestRateInput {...args} />
);
Default.args = {
  value: 1.5,
  onChange: (value) => console.log('金利変更:', value),
};

export const WithError: Story<InterestRateInputProps> = (args) => (
  <InterestRateInput {...args} />
);
WithError.args = {
  value: 0,
  onChange: (value) => console.log('金利変更:', value),
  error: '金利は必須です',
};
