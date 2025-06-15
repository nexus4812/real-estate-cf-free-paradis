import type { Story } from '@ladle/react';
import { SimulationResultPanel, SimulationResultPanelProps } from '@/components/organism/SimulationResultPanel';
import { SimulationResults } from '@/domain/simulation/simulationService';

const mockResults: SimulationResults = {
  annualBalances: Array.from({ length: 30 }, (_, i) => ({ year: i + 1, value: 1000000 + i * 50000 })),
  grossYields: Array.from({ length: 30 }, (_, i) => ({ year: i + 1, value: 5.0 - i * 0.05 })),
  realYields: Array.from({ length: 30 }, (_, i) => ({ year: i + 1, value: 4.0 - i * 0.04 })),
  preTaxCashFlows: Array.from({ length: 30 }, (_, i) => ({ year: i + 1, value: 800000 + i * 40000 })),
  taxableIncomes: Array.from({ length: 30 }, (_, i) => ({ year: i + 1, value: 500000 + i * 30000 })),
  totalPaymentAmount: 50000000,
  initialAnnualIncome: 3000000,
  finalAssetValue: 60000000,
  metrics: {
    initialInvestment: 20000000,
    totalIncome: 90000000,
    totalExpense: 70000000,
    netProfit: 20000000,
    cashFlow: 1500000,
    yield: 6.0,
    roi: 0.1,
    irr: 0.08,
    npv: 5000000,
  },
};

export const Default: Story<SimulationResultPanelProps> = (args) => (
  <div className="w-full max-w-4xl mx-auto p-4">
    <SimulationResultPanel {...args} />
  </div>
);
Default.args = {
  results: mockResults,
  loading: false,
  error: undefined,
};

export const Loading: Story<SimulationResultPanelProps> = (args) => (
  <div className="w-full max-w-4xl mx-auto p-4">
    <SimulationResultPanel {...args} />
  </div>
);
Loading.args = {
  results: undefined,
  loading: true,
  error: undefined,
};

export const WithError: Story<SimulationResultPanelProps> = (args) => (
  <div className="w-full max-w-4xl mx-auto p-4">
    <SimulationResultPanel {...args} />
  </div>
);
WithError.args = {
  results: undefined,
  loading: false,
  error: 'シミュレーション中にエラーが発生しました。入力内容を確認してください。',
};
