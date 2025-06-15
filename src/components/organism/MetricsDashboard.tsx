import React from 'react';
import { MetricCard, MetricCardProps } from '@/components/molecules/MetricCard';
import { LoadingSpinner } from '@/components/molecules/LoadingSpinner';
import { Card } from '@/components/atoms/Card';

export type MetricsDashboardProps = {
  metrics: MetricCardProps[]; // MetricCardPropsの配列を受け取る
  loading?: boolean;
};

/**
 * 指標ダッシュボードコンポーネント
 * 複数のMetricCardを配置し、主要なシミュレーション指標を表示します。
 * @param props - MetricsDashboardProps
 * @returns JSX.Element
 */
export const MetricsDashboard: React.FC<MetricsDashboardProps> = ({
  metrics,
  loading = false,
}) => {
  if (loading) {
    return <LoadingSpinner message="指標を読み込み中..." />;
  }

  if (!metrics || metrics.length === 0) {
    return (
      <Card>
        <p className="text-center text-gray-600">
          表示する指標がありません。
        </p>
      </Card>
    );
  }

  return (
    <Card>
      <h3 className="section-title">主要指標</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            unit={metric.unit}
            change={metric.change}
            trend={metric.trend}
          />
        ))}
      </div>
    </Card>
  );
};
