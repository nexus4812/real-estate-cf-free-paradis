import type { Story } from '@ladle/react';
import { ResultSummary, ResultSummaryProps } from '@/components/molecules/ResultSummary';

export const Default: Story<ResultSummaryProps> = (args) => (
  <ResultSummary {...args} />
);
Default.args = {
  totalPayment: 123456789,
  initialIncome: 1234567,
  cashFlow: 500000,
  yield: 5.5,
};

export const ZeroValues: Story<ResultSummaryProps> = (args) => (
  <ResultSummary {...args} />
);
ZeroValues.args = {
  totalPayment: 0,
  initialIncome: 0,
  cashFlow: 0,
  yield: 0,
};
