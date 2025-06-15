import type { Story } from '@ladle/react';
import { CashFlowChart, CashFlowChartProps, ChartData, ChartDataPoint } from '@/components/organism/CashFlowChart';

const generateMockData = (startValue: number, color: string, title: string, unit: string): ChartData => {
  const dataPoints: ChartDataPoint[] = Array.from({ length: 35 }, (_, i) => ({
    year: i + 1,
    value: startValue + i * 100000,
    label: `${i + 1}年目`,
  }));
  return {
    data: dataPoints,
    title: title,
    unit: unit,
    color: color,
  };
};

const mockCashFlowData: ChartData[] = [
  generateMockData(1000000, '#2563eb', '年間キャッシュフロー', '万円'),
];

export const Default: Story<CashFlowChartProps> = (args) => (
  <div className="max-w-4xl mx-auto p-4">
    <CashFlowChart {...args} />
  </div>
);
Default.args = {
  data: mockCashFlowData,
  loading: false,
  height: 400,
};

export const Loading: Story<CashFlowChartProps> = (args) => (
  <div className="max-w-4xl mx-auto p-4">
    <CashFlowChart {...args} />
  </div>
);
Loading.args = {
  data: [],
  loading: true,
  height: 400,
};

export const NoData: Story<CashFlowChartProps> = (args) => (
  <div className="max-w-4xl mx-auto p-4">
    <CashFlowChart {...args} />
  </div>
);
NoData.args = {
  data: [],
  loading: false,
  height: 400,
};
