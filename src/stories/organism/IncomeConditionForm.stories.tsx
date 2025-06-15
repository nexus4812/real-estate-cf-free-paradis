import type { Story } from '@ladle/react';
import { IncomeConditionForm, IncomeConditionFormProps } from '@/components/organism/IncomeConditionForm';
import { useState } from 'react';

export const Default: Story<IncomeConditionFormProps> = () => {
  const [state, setState] = useState({
    vacancyRate: 10,
    rentIncreaseRate: 1,
  });

  const handleChange = (field: string, value: any) => {
    setState((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <IncomeConditionForm
      vacancyRate={state.vacancyRate}
      rentIncreaseRate={state.rentIncreaseRate}
      onVacancyRateChange={(value) => handleChange('vacancyRate', value)}
      onRentIncreaseRateChange={(value) => handleChange('rentIncreaseRate', value)}
      errors={{}}
    />
  );
};

export const WithErrors: Story<IncomeConditionFormProps> = () => {
  const [state, setState] = useState({
    vacancyRate: 0,
    rentIncreaseRate: 0,
  });

  const handleChange = (field: string, value: any) => {
    setState((prev) => ({ ...prev, [field]: value }));
  };

  const errors = {
    vacancyRate: '空室率は必須です',
    rentIncreaseRate: '家賃上昇率は必須です',
  };

  return (
    <IncomeConditionForm
      vacancyRate={state.vacancyRate}
      rentIncreaseRate={state.rentIncreaseRate}
      onVacancyRateChange={(value) => handleChange('vacancyRate', value)}
      onRentIncreaseRateChange={(value) => handleChange('rentIncreaseRate', value)}
      errors={errors}
    />
  );
};
