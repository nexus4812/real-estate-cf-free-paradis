import type { Story } from '@ladle/react';
import { LoanTermInput, LoanTermInputProps } from '@/components/molecules/LoanTermInput';

export const Default: Story<LoanTermInputProps> = (args) => (
  <LoanTermInput {...args} />
);
Default.args = {
  value: 30,
  onChange: (value) => console.log('借入期間変更:', value),
};

export const WithError: Story<LoanTermInputProps> = (args) => (
  <LoanTermInput {...args} />
);
WithError.args = {
  value: 0,
  onChange: (value) => console.log('借入期間変更:', value),
  error: '借入期間は必須です',
};
