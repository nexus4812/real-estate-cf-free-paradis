import type { Story } from '@ladle/react';
import { SelfFundsInput, SelfFundsInputProps } from '@/components/molecules/SelfFundsInput';

export const Default: Story<SelfFundsInputProps> = (args) => (
  <SelfFundsInput {...args} />
);
Default.args = {
  value: 10000000, // 1000万円
  onChange: (value) => console.log('自己資金変更:', value),
};

export const WithError: Story<SelfFundsInputProps> = (args) => (
  <SelfFundsInput {...args} />
);
WithError.args = {
  value: 0,
  onChange: (value) => console.log('自己資金変更:', value),
  error: '自己資金は必須です',
};
