import type { Story } from '@ladle/react';
import { CashFlowChart, CashFlowChartProps } from '@/components/organism/CashFlowChart';
import { ChartData } from '@/types/chart';

const mockCashFlowData: ChartData[] = [
  {
    data: Array.from({ length: 30 }, (_, i) => ({ year: i + 1, value: 100 + i * 5 })),
    title: '年間キャッシュフロー',
    unit: '万円',
    color: '#2563eb',
  },
];

export const Default: Story<CashFlowChartProps> = (args) => (
  <div className="w-full max-w-4xl mx-auto p-4">
    <CashFlowChart {...args} />
  </div>
);
Default.args = {
  data: mockCashFlowData,
  loading: false,
};

export const Loading: Story<CashFlowChartProps> = (args) => (
  <div className="w-full max-w-4xl mx-auto p-4">
    <CashFlowChart {...args} />
  </div>
);
Loading.args = {
  data: [],
  loading: true,
};

export const EmptyData: Story<CashFlowChartProps> = (args) => (
  <div className="w-full max-w-4xl mx-auto p-4">
    <CashFlowChart {...args} />
  </div>
);
EmptyData.args = {
  data: [],
  loading: false,
};
