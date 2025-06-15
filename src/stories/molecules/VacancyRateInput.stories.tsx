import type { Story } from '@ladle/react';
import { VacancyRateInput, VacancyRateInputProps } from '@/components/molecules/VacancyRateInput';

export const Default: Story<VacancyRateInputProps> = (args) => (
  <VacancyRateInput {...args} />
);
Default.args = {
  value: 10.0,
  onChange: (value) => console.log('空室率変更:', value),
};

export const WithError: Story<VacancyRateInputProps> = (args) => (
  <VacancyRateInput {...args} />
);
WithError.args = {
  value: 0,
  onChange: (value) => console.log('空室率変更:', value),
  error: '空室率は必須です',
};
