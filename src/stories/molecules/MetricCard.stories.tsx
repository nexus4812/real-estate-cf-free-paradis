import type { Story } from '@ladle/react';
import { MetricCard, MetricCardProps } from '@/components/molecules/MetricCard';

export const Default: Story<MetricCardProps> = (args) => (
  <div className="w-64">
    <MetricCard {...args} />
  </div>
);
Default.args = {
  title: '年間キャッシュフロー',
  value: 120,
  unit: '万円',
  change: 10,
  trend: 'up',
};

export const NegativeChange: Story<MetricCardProps> = (args) => (
  <div className="w-64">
    <MetricCard {...args} />
  </div>
);
NegativeChange.args = {
  title: '年間キャッシュフロー',
  value: -50,
  unit: '万円',
  change: -5,
  trend: 'down',
};

export const NoChange: Story<MetricCardProps> = (args) => (
  <div className="w-64">
    <MetricCard {...args} />
  </div>
);
NoChange.args = {
  title: '年間キャッシュフロー',
  value: 0,
  unit: '万円',
  change: 0,
  trend: 'neutral',
};

export const Loading: Story<MetricCardProps> = (args) => (
  <div className="w-64">
    <MetricCard {...args} />
  </div>
);
Loading.args = {
  title: '年間キャッシュフロー',
  loading: true,
};
