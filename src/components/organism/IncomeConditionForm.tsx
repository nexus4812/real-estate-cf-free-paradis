import React from 'react';
import { VacancyRateInput } from '@/components/molecules/VacancyRateInput';
import { RentIncreaseRateInput } from '@/components/molecules/RentIncreaseRateInput';
import { Card } from '@/components/atoms/Card';

export type IncomeConditionFormProps = {
  vacancyRate: number;
  rentIncreaseRate: number;
  onVacancyRateChange: (value: number) => void;
  onRentIncreaseRateChange: (value: number) => void;
  errors: Record<string, string | undefined>;
};

/**
 * 収入条件入力フォームコンポーネント
 * @param props - IncomeConditionFormProps
 * @returns JSX.Element
 */
export const IncomeConditionForm: React.FC<IncomeConditionFormProps> = ({
  vacancyRate,
  rentIncreaseRate,
  onVacancyRateChange,
  onRentIncreaseRateChange,
  errors,
}) => {
  return (
    <Card>
      <h3 className="section-title">収入条件</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <VacancyRateInput
          value={vacancyRate}
          onChange={onVacancyRateChange}
          error={errors.vacancyRate}
        />
        <RentIncreaseRateInput
          value={rentIncreaseRate}
          onChange={onRentIncreaseRateChange}
          error={errors.rentIncreaseRate}
        />
      </div>
    </Card>
  );
};
