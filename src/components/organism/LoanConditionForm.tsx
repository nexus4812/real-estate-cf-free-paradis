import React from 'react';
import { SelfFundsInput } from '@/components/molecules/SelfFundsInput';
import { InterestRateInput } from '@/components/molecules/InterestRateInput';
import { LoanTermInput } from '@/components/molecules/LoanTermInput';
import { Card } from '@/components/atoms/Card';

export type LoanConditionFormProps = {
  selfFunds: number;
  interestRate: number;
  loanTerm: number;
  onSelfFundsChange: (value: number) => void;
  onInterestRateChange: (value: number) => void;
  onLoanTermChange: (value: number) => void;
  errors: Record<string, string | undefined>;
};

/**
 * 融資条件入力フォームコンポーネント
 * @param props - LoanConditionFormProps
 * @returns JSX.Element
 */
export const LoanConditionForm: React.FC<LoanConditionFormProps> = ({
  selfFunds,
  interestRate,
  loanTerm,
  onSelfFundsChange,
  onInterestRateChange,
  onLoanTermChange,
  errors,
}) => {
  return (
    <Card>
      <h3 className="section-title">融資条件</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelfFundsInput
          value={selfFunds}
          onChange={onSelfFundsChange}
          error={errors.selfFunds}
        />
        <InterestRateInput
          value={interestRate}
          onChange={onInterestRateChange}
          error={errors.interestRate}
        />
        <LoanTermInput
          value={loanTerm}
          onChange={onLoanTermChange}
          error={errors.loanTerm}
        />
      </div>
    </Card>
  );
};
