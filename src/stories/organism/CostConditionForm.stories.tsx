import type { Story } from '@ladle/react';
import { CostConditionForm, CostConditionFormProps } from '@/components/organism/CostConditionForm';
import { FieldErrors } from 'react-hook-form';
import { SimulationInput } from '@/domain/simulation/simulationService';

export const Default: Story<CostConditionFormProps> = (args) => (
  <div className="max-w-2xl mx-auto p-4">
    <CostConditionForm {...args} />
  </div>
);
Default.args = {
  managementFeeRatio: 5.0,
  repairCostRatio: 1.0,
  onManagementFeeRatioChange: (value) => console.log('管理費率変更:', value),
  onRepairCostRatioChange: (value) => console.log('修繕費率変更:', value),
  errors: {},
};

export const WithErrors: Story<CostConditionFormProps> = (args) => (
  <div className="max-w-2xl mx-auto p-4">
    <CostConditionForm {...args} />
  </div>
);
WithErrors.args = {
  managementFeeRatio: 0,
  repairCostRatio: 0,
  onManagementFeeRatioChange: (value) => console.log('管理費率変更:', value),
  onRepairCostRatioChange: (value) => console.log('修繕費率変更:', value),
  errors: {
    managementFeeRatio: '管理費率は必須です',
    repairCostRatio: '修繕費率は必須です',
  },
};
