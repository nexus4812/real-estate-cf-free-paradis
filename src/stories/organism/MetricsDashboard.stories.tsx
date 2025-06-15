import type { Story } from '@ladle/react';
import { MetricsDashboard, MetricsDashboardProps } from '@/components/organism/MetricsDashboard';
import { MetricCardProps } from '@/components/molecules/MetricCard';

const mockMetrics: Omit<MetricCardProps, 'trend'>[] = [
  { title: '初期投資額', value: 10000, unit: '万円', change: 0 },
  { title: '年間収入', value: 300, unit: '万円', change: 5 },
  { title: '年間支出', value: 150, unit: '万円', change: -2 },
  { title: '税引前CF', value: 150, unit: '万円', change: 10 },
  { title: '表面利回り', value: 5.0, unit: '%', change: 0.5 },
  { title: '実質利回り', value: 4.0, unit: '%', change: 0.3 },
];

export const Default: Story<MetricsDashboardProps> = (args) => (
  <div className="max-w-4xl mx-auto p-4">
    <MetricsDashboard {...args} />
  </div>
);
Default.args = {
  metrics: mockMetrics,
  loading: false,
};

export const Loading: Story<MetricsDashboardProps> = (args) => (
  <div className="max-w-4xl mx-auto p-4">
    <MetricsDashboard {...args} />
  </div>
);
Loading.args = {
  metrics: [],
  loading: true,
};

export const NoMetrics: Story<MetricsDashboardProps> = (args) => (
  <div className="max-w-4xl mx-auto p-4">
    <MetricsDashboard {...args} />
  </div>
);
NoMetrics.args = {
  metrics: [],
  loading: false,
};
