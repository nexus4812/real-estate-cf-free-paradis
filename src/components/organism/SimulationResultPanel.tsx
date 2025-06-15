import React from 'react';
import { MetricCard, MetricCardProps } from '@/components/molecules/MetricCard';
import { ResultSummary } from '@/components/molecules/ResultSummary';
import { ErrorMessage } from '@/components/molecules/ErrorMessage';
import { LoadingSpinner } from '@/components/molecules/LoadingSpinner';
import { SimulationResults } from '@/domain/simulation/simulationService';
import { Card } from '@/components/atoms/Card';

export type SimulationResultPanelProps = {
  results: SimulationResults | null;
  loading: boolean;
  error: string | null;
};

/**
 * シミュレーション結果表示パネルコンポーネント
 * サマリーと詳細指標を表示します。
 * @param props - SimulationResultPanelProps
 * @returns JSX.Element
 */
export const SimulationResultPanel: React.FC<SimulationResultPanelProps> = ({
  results,
  loading,
  error,
}) => {
  if (loading) {
    return <LoadingSpinner message="シミュレーション結果を計算中..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!results) {
    return (
      <Card>
        <p className="text-center text-gray-600">
          シミュレーションを実行すると、ここに結果が表示されます。
        </p>
      </Card>
    );
  }

  const {
    totalPaymentAmount,
    initialAnnualIncome,
    metrics,
  } = results;

  // MetricCardProps に変換するヘルパー関数
  const formatMetricsForDisplay = (
    metricsData: SimulationResults['metrics']
  ): MetricCardProps[] => {
    const formattedMetrics: MetricCardProps[] = [];

    // 各メトリックをMetricCardProps形式に変換
    formattedMetrics.push({
      title: '初期投資額',
      value: metricsData.initialInvestment,
      unit: '万円',
      change: 0, // 仮の値
      trend: 'neutral', // 仮の値
    });
    formattedMetrics.push({
      title: '総収入',
      value: metricsData.totalIncome,
      unit: '万円',
      change: 0, // 仮の値
      trend: 'neutral', // 仮の値
    });
    formattedMetrics.push({
      title: '総費用',
      value: metricsData.totalExpense,
      unit: '万円',
      change: 0, // 仮の値
      trend: 'neutral', // 仮の値
    });
    formattedMetrics.push({
      title: '純利益',
      value: metricsData.netProfit,
      unit: '万円',
      change: 0, // 仮の値
      trend: 'neutral', // 仮の値
    });
    formattedMetrics.push({
      title: 'キャッシュフロー',
      value: metricsData.cashFlow,
      unit: '万円',
      change: 0, // 仮の値
      trend: 'neutral', // 仮の値
    });
    formattedMetrics.push({
      title: '利回り',
      value: metricsData.yield,
      unit: '%',
      change: 0, // 仮の値
      trend: 'neutral', // 仮の値
    });
    formattedMetrics.push({
      title: 'ROI',
      value: metricsData.roi,
      unit: '%',
      change: 0, // 仮の値
      trend: 'neutral', // 仮の値
    });
    formattedMetrics.push({
      title: 'IRR',
      value: metricsData.irr,
      unit: '%',
      change: 0, // 仮の値
      trend: 'neutral', // 仮の値
    });
    formattedMetrics.push({
      title: 'NPV',
      value: metricsData.npv,
      unit: '万円',
      change: 0, // 仮の値
      trend: 'neutral', // 仮の値
    });

    return formattedMetrics;
  };

  const displayedMetrics = formatMetricsForDisplay(metrics);

  return (
    <Card>
      <h2 className="section-title">シミュレーション結果</h2>

      <ResultSummary
        totalPayment={totalPaymentAmount}
        initialIncome={initialAnnualIncome}
        cashFlow={metrics.cashFlow}
        yield={metrics.yield}
      />

      <div className="mt-8">
        <h3 className="section-title">詳細指標</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedMetrics.map((metric, index) => (
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
      </div>
    </Card>
  );
};
