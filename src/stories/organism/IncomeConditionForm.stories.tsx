import type { Story } from '@ladle/react';
import { IncomeConditionForm, IncomeConditionFormProps } from '@/components/organism/IncomeConditionForm';
import { FieldErrors } from 'react-hook-form';
import { SimulationInput } from '@/domain/simulation/simulationService';

export const Default: Story<IncomeConditionFormProps> = (args) => (
  <div className="max-w-2xl mx-auto p-4">
    <IncomeConditionForm {...args} />
  </div>
);
Default.args = {
  vacancyRate: 5.0,
  rentIncreaseRate: 1.0,
  onVacancyRateChange: (value) => console.log('空室率変更:', value),
  onRentIncreaseRateChange: (value) => console.log('家賃上昇率変更:', value),
  errors: {},
};

export const WithErrors: Story<IncomeConditionFormProps> = (args) => (
  <div className="max-w-2xl mx-auto p-4">
    <IncomeConditionForm {...args} />
  </div>
);
WithErrors.args = {
  vacancyRate: 0,
  rentIncreaseRate: 0,
  onVacancyRateChange: (value) => console.log('空室率変更:', value),
  onRentIncreaseRateChange: (value) => console.log('家賃上昇率変更:', value),
  errors: {
    vacancyRate: '空室率は必須です',
    rentIncreaseRate: '家賃上昇率は必須です',
  },
};
