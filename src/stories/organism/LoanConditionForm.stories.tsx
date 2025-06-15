import type { Story } from '@ladle/react';
import { LoanConditionForm, LoanConditionFormProps } from '@/components/organism/LoanConditionForm';
import { useState } from 'react';

export const Default: Story<LoanConditionFormProps> = () => {
  const [state, setState] = useState({
    selfFunds: 10000000,
    interestRate: 1.5,
    loanTerm: 30,
  });

  const handleChange = (field: string, value: any) => {
    setState((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <LoanConditionForm
      selfFunds={state.selfFunds}
      interestRate={state.interestRate}
      loanTerm={state.loanTerm}
      onSelfFundsChange={(value) => handleChange('selfFunds', value)}
      onInterestRateChange={(value) => handleChange('interestRate', value)}
      onLoanTermChange={(value) => handleChange('loanTerm', value)}
      errors={{}}
    />
  );
};

export const WithErrors: Story<LoanConditionFormProps> = () => {
  const [state, setState] = useState({
    selfFunds: 0,
    interestRate: 0,
    loanTerm: 0,
  });

  const handleChange = (field: string, value: any) => {
    setState((prev) => ({ ...prev, [field]: value }));
  };

  const errors = {
    selfFunds: '自己資金は必須です',
    interestRate: '金利は必須です',
    loanTerm: '借入期間は必須です',
  };

  return (
    <LoanConditionForm
      selfFunds={state.selfFunds}
      interestRate={state.interestRate}
      loanTerm={state.loanTerm}
      onSelfFundsChange={(value) => handleChange('selfFunds', value)}
      onInterestRateChange={(value) => handleChange('interestRate', value)}
      onLoanTermChange={(value) => handleChange('loanTerm', value)}
      errors={errors}
    />
  );
};
