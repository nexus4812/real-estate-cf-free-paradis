import React from 'react';
import { ManagementFeeRatioInput } from '@/components/molecules/ManagementFeeRatioInput';
import { RepairCostRatioInput } from '@/components/molecules/RepairCostRatioInput';
import { Card } from '@/components/atoms/Card';

export type CostConditionFormProps = {
  managementFeeRatio: number;
  repairCostRatio: number;
  onManagementFeeRatioChange: (value: number) => void;
  onRepairCostRatioChange: (value: number) => void;
  errors: Record<string, string | undefined>;
};

/**
 * 支出条件入力フォームコンポーネント
 * @param props - CostConditionFormProps
 * @returns JSX.Element
 */
export const CostConditionForm: React.FC<CostConditionFormProps> = ({
  managementFeeRatio,
  repairCostRatio,
  onManagementFeeRatioChange,
  onRepairCostRatioChange,
  errors,
}) => {
  return (
    <Card>
      <h3 className="section-title">支出条件</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ManagementFeeRatioInput
          value={managementFeeRatio}
          onChange={onManagementFeeRatioChange}
          error={errors.managementFeeRatio}
        />
        <RepairCostRatioInput
          value={repairCostRatio}
          onChange={onRepairCostRatioChange}
          error={errors.repairCostRatio}
        />
      </div>
    </Card>
  );
};
