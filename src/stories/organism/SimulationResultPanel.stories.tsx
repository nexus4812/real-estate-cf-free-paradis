import type { Story } from '@ladle/react';
import { SimulationResultPanel, SimulationResultPanelProps } from '@/components/organism/SimulationResultPanel';
import { SimulationResults } from '@/domain/simulation/simulationService';

const mockSimulationResults: SimulationResults = {
  annualBalances: Array.from({ length: 35 }, (_, i) => ({ year: i + 1, value: 1000000 + i * 50000 })),
  grossYields: Array.from({ length: 35 }, (_, i) => ({ year: i + 1, value: 5.0 - i * 0.05 })),
  realYields: Array.from({ length: 35 }, (_, i) => ({ year: i + 1, value: 4.0 - i * 0.05 })),
  preTaxCashFlows: Array.from({ length: 35 }, (_, i) => ({ year: i + 1, value: 800000 + i * 40000 })),
  taxableIncomes: Array.from({ length: 35 }, (_, i) => ({ year: i + 1, value: 500000 + i * 30000 })),
  totalPaymentAmount: 50000000,
  initialAnnualIncome: 3000000,
  metrics: {
    initialInvestment: 10000000,
    totalIncome: 100000000,
    totalExpense: 80000000,
    netProfit: 20000000,
    cashFlow: 1200000,
    yield: 6.0,
    roi: 12.0,
    irr: 8.0,
    npv: 5000000,
  },
};

export const Default: Story<SimulationResultPanelProps> = (args) => (
  <div className="max-w-4xl mx-auto p-4">
    <SimulationResultPanel {...args} />
  </div>
);
Default.args = {
  results: mockSimulationResults,
  loading: false,
  error: null,
};

export const Loading: Story<SimulationResultPanelProps> = (args) => (
  <div className="max-w-4xl mx-auto p-4">
    <SimulationResultPanel {...args} />
  </div>
);
Loading.args = {
  results: null,
  loading: true,
  error: null,
};

export const Error: Story<SimulationResultPanelProps> = (args) => (
  <div className="max-w-4xl mx-auto p-4">
    <SimulationResultPanel {...args} />
  </div>
);
Error.args = {
  results: null,
  loading: false,
  error: 'シミュレーション中にエラーが発生しました。',
};

export const NoResults: Story<SimulationResultPanelProps> = (args) => (
  <div className="max-w-4xl mx-auto p-4">
    <SimulationResultPanel {...args} />
  </div>
);
NoResults.args = {
  results: null,
  loading: false,
  error: null,
};
