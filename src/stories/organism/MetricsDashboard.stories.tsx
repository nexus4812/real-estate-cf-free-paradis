import type { Story } from '@ladle/react';
import { MetricsDashboard, MetricsDashboardProps } from '@/components/organism/MetricsDashboard';
import { SimulationResults } from '@/domain/simulation/simulationService';

const mockMetrics: SimulationResults['metrics'] = {
  initialInvestment: 20000000,
  totalIncome: 90000000,
  totalExpense: 70000000,
  netProfit: 20000000,
  cashFlow: 1500000,
  yield: 6.0,
  roi: 0.1,
  irr: 0.08,
  npv: 5000000,
};

export const Default: Story<MetricsDashboardProps> = (args) => (
  <div className="w-full max-w-4xl mx-auto p-4">
    <MetricsDashboard {...args} />
  </div>
);
Default.args = {
  metrics: mockMetrics,
  loading: false,
};

export const Loading: Story<MetricsDashboardProps> = (args) => (
  <div className="w-full max-w-4xl mx-auto p-4">
    <MetricsDashboard {...args} />
  </div>
);
Loading.args = {
  metrics: undefined,
  loading: true,
};
