import type { Story } from '@ladle/react';
import { CostConditionForm, CostConditionFormProps } from '@/components/organism/CostConditionForm';
import { useState } from 'react';

export const Default: Story<CostConditionFormProps> = () => {
  const [state, setState] = useState({
    managementFeeRatio: 5,
    repairCostRatio: 1,
  });

  const handleChange = (field: string, value: any) => {
    setState((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <CostConditionForm
      managementFeeRatio={state.managementFeeRatio}
      repairCostRatio={state.repairCostRatio}
      onManagementFeeRatioChange={(value) => handleChange('managementFeeRatio', value)}
      onRepairCostRatioChange={(value) => handleChange('repairCostRatio', value)}
      errors={{}}
    />
  );
};

export const WithErrors: Story<CostConditionFormProps> = () => {
  const [state, setState] = useState({
    managementFeeRatio: 0,
    repairCostRatio: 0,
  });

  const handleChange = (field: string, value: any) => {
    setState((prev) => ({ ...prev, [field]: value }));
  };

  const errors = {
    managementFeeRatio: '管理費率は必須です',
    repairCostRatio: '修繕費率は必須です',
  };

  return (
    <CostConditionForm
      managementFeeRatio={state.managementFeeRatio}
      repairCostRatio={state.repairCostRatio}
      onManagementFeeRatioChange={(value) => handleChange('managementFeeRatio', value)}
      onRepairCostRatioChange={(value) => handleChange('repairCostRatio', value)}
      errors={errors}
    />
  );
};
