import type { Story } from '@ladle/react';
import { ResultSummary, ResultSummaryProps } from '@/components/molecules/ResultSummary';

export const Default: Story<ResultSummaryProps> = (args) => (
  <div className="w-96">
    <ResultSummary {...args} />
  </div>
);
Default.args = {
  totalPayment: 50000000,
  initialIncome: 3000000,
  cashFlow: 1200000,
  yield: 5.5,
};

export const NegativeCashFlow: Story<ResultSummaryProps> = (args) => (
  <div className="w-96">
    <ResultSummary {...args} />
  </div>
);
NegativeCashFlow.args = {
  totalPayment: 50000000,
  initialIncome: 3000000,
  cashFlow: -500000,
  yield: 3.2,
};
