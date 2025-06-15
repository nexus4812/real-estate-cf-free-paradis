import React from 'react';
import { Card } from '@/components/atoms/Card';
import { MetricCard, MetricCardProps } from '@/components/molecules/MetricCard';
import { LoadingSpinner } from '@/components/molecules/LoadingSpinner';

export type MetricsDashboardProps = {
  metrics: Omit<MetricCardProps, 'trend'>[]; // trendは内部で計算するため除外
  loading?: boolean;
};

/**
 * 指標ダッシュボードコンポーネント
 * 複数のMetricCardを配置し、グリッド表示する
 * @param props - MetricsDashboardProps
 * @returns JSX.Element
 */
export const MetricsDashboard: React.FC<MetricsDashboardProps> = ({
  metrics,
  loading = false,
}) => {
  if (loading) {
    return (
      <Card padding="md" shadow="sm" border>
        <LoadingSpinner message="指標を読み込み中..." />
      </Card>
    );
  }

  if (!metrics || metrics.length === 0) {
    return (
      <Card padding="md" shadow="sm" border>
        <div className="flex items-center justify-center h-full min-h-[100px]">
          <p className="text-gray-500">表示する指標がありません。</p>
        </div>
      </Card>
    );
  }

  return (
    <Card padding="md" shadow="sm" border>
      <h3 className="section-title mb-4">主要指標</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            unit={metric.unit}
            change={metric.change}
            // changeの値に基づいてtrendを決定
            trend={
              metric.change !== undefined
                ? metric.change > 0
                  ? 'up'
                  : metric.change < 0
                  ? 'down'
                  : 'neutral'
                : 'neutral'
            }
          />
        ))}
      </div>
    </Card>
  );
};
