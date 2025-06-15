import type { Story } from '@ladle/react';
import { YieldChart, YieldChartProps } from '@/components/organism/YieldChart';
import { ChartData } from '@/types/chart';

const mockYieldData: ChartData[] = [
  {
    data: Array.from({ length: 30 }, (_, i) => ({ year: i + 1, value: 5.0 - i * 0.05 })),
    title: '表面利回り',
    unit: '%',
    color: '#2563eb',
  },
  {
    data: Array.from({ length: 30 }, (_, i) => ({ year: i + 1, value: 4.0 - i * 0.04 })),
    title: '実質利回り',
    unit: '%',
    color: '#ef4444',
  },
];

export const Default: Story<YieldChartProps> = (args) => (
  <div className="w-full max-w-4xl mx-auto p-4">
    <YieldChart {...args} />
  </div>
);
Default.args = {
  data: mockYieldData,
  loading: false,
};

export const Loading: Story<YieldChartProps> = (args) => (
  <div className="w-full max-w-4xl mx-auto p-4">
    <YieldChart {...args} />
  </div>
);
Loading.args = {
  data: [],
  loading: true,
};

export const EmptyData: Story<YieldChartProps> = (args) => (
  <div className="w-full max-w-4xl mx-auto p-4">
    <YieldChart {...args} />
  </div>
);
EmptyData.args = {
  data: [],
  loading: false,
};
