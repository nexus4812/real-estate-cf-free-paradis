import type { Story } from '@ladle/react';
import { YieldChart, YieldChartProps } from '@/components/organism/YieldChart';
import { ChartData, ChartDataPoint } from '@/components/organism/CashFlowChart'; // CashFlowChartから型をインポート

const generateMockYieldData = (startValue: number, color: string, title: string, unit: string): ChartData => {
  const dataPoints: ChartDataPoint[] = Array.from({ length: 35 }, (_, i) => ({
    year: i + 1,
    value: startValue - i * 0.05,
    label: `${i + 1}年目`,
  }));
  return {
    data: dataPoints,
    title: title,
    unit: unit,
    color: color,
  };
};

const mockYieldData: ChartData[] = [
  generateMockYieldData(5.0, '#2563eb', '表面利回り', '%'),
  generateMockYieldData(4.0, '#ef4444', '実質利回り', '%'),
];

export const Default: Story<YieldChartProps> = (args) => (
  <div className="max-w-4xl mx-auto p-4">
    <YieldChart {...args} />
  </div>
);
Default.args = {
  data: mockYieldData,
  loading: false,
  height: 400,
};

export const Loading: Story<YieldChartProps> = (args) => (
  <div className="max-w-4xl mx-auto p-4">
    <YieldChart {...args} />
  </div>
);
Loading.args = {
  data: [],
  loading: true,
  height: 400,
};

export const NoData: Story<YieldChartProps> = (args) => (
  <div className="max-w-4xl mx-auto p-4">
    <YieldChart {...args} />
  </div>
);
NoData.args = {
  data: [],
  loading: false,
  height: 400,
};
