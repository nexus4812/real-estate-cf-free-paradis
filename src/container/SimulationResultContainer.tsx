import React from 'react';
import { useSimulationStore } from '@/store/useSimulationStore';
import { SimulationResultPanel } from '@/components/organism/SimulationResultPanel';
import { CashFlowChart } from '@/components/organism/CashFlowChart';
import { YieldChart } from '@/components/organism/YieldChart';
import { MetricsDashboard } from '@/components/organism/MetricsDashboard';
import { ChartData } from '@/types/chart';
import { SimulationResults } from '@/domain/simulation/simulationService';
import { MetricCardProps } from '@/components/molecules/MetricCard';

/**
 * シミュレーション結果のContainer
 * シミュレーション結果の取得、表示制御を担当
 */
import { LoadingSpinner } from '@/components/molecules/LoadingSpinner';
import { ErrorMessage } from '@/components/molecules/ErrorMessage';

export const SimulationResultContainer: React.FC = () => {
  const { results, loading, error } = useSimulationStore();

  if (loading) {
    return <LoadingSpinner message="シミュレーション結果を計算中..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!results) {
    return null; // 結果がない場合は何も表示しない
  }

  // CashFlowChart用のデータ変換
  const cashFlowChartData: ChartData[] = React.useMemo(() => {
    return [
      {
        data: results.annualBalances.map((item) => ({
          year: item.year,
          value: item.value / 10000, // 円を万円に変換
        })),
        title: '年間収支',
        unit: '万円',
        color: '#2563eb', // blue-600
      },
    ];
  }, [results]);

  // YieldChart用のデータ変換
  const yieldChartData: ChartData[] = React.useMemo(() => {
    return [
      {
        data: results.grossYields.map((item) => ({
          year: item.year,
          value: item.value,
        })),
        title: '表面利回り',
        unit: '%',
        color: '#f59e0b', // amber-500
      },
      {
        data: results.realYields.map((item) => ({
          year: item.year,
          value: item.value,
        })),
        title: '実質利回り',
        unit: '%',
        color: '#10b981', // emerald-500
      },
    ];
  }, [results]);

  // MetricCardProps に変換するヘルパー関数
  const formatMetricsForDisplay = (
    metricsData: SimulationResults['metrics']
  ): MetricCardProps[] => {
    const formattedMetrics: MetricCardProps[] = [];

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

  // MetricsDashboard用のデータ
  const metricsData = React.useMemo(() => {
    return formatMetricsForDisplay(results.metrics);
  }, [results]);

  return (
    <div className="space-y-8">
      <SimulationResultPanel results={results} loading={loading} error={error} />
      <MetricsDashboard metrics={metricsData} loading={loading} />
      <CashFlowChart data={cashFlowChartData} loading={loading} />
      <YieldChart data={yieldChartData} loading={loading} />
    </div>
  );
};
