import type { Story } from '@ladle/react';
import { LoanConditionForm, LoanConditionFormProps } from '@/components/organism/LoanConditionForm';
import { FieldErrors } from 'react-hook-form';
import { SimulationInput } from '@/domain/simulation/simulationService';

export const Default: Story<LoanConditionFormProps> = (args) => (
  <div className="max-w-2xl mx-auto p-4">
    <LoanConditionForm {...args} />
  </div>
);
Default.args = {
  selfFunds: 10000000,
  interestRate: 1.5,
  loanTerm: 30,
  onSelfFundsChange: (value) => console.log('自己資金変更:', value),
  onInterestRateChange: (value) => console.log('金利変更:', value),
  onLoanTermChange: (value) => console.log('借入期間変更:', value),
  errors: {},
};

export const WithErrors: Story<LoanConditionFormProps> = (args) => (
  <div className="max-w-2xl mx-auto p-4">
    <LoanConditionForm {...args} />
  </div>
);
WithErrors.args = {
  selfFunds: 0,
  interestRate: 0,
  loanTerm: 0,
  onSelfFundsChange: (value) => console.log('自己資金変更:', value),
  onInterestRateChange: (value) => console.log('金利変更:', value),
  onLoanTermChange: (value) => console.log('借入期間変更:', value),
  errors: {
    selfFunds: '自己資金は必須です',
    interestRate: '金利は必須です',
    loanTerm: '借入期間は必須です',
  },
};
