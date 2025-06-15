import React from 'react';
import { useSimulationStore } from '@/store/useSimulationStore';
import { SimulationResultPanel } from '@/components/organism/SimulationResultPanel';
import { CashFlowChart, ChartData } from '@/components/organism/CashFlowChart';
import { YieldChart } from '@/components/organism/YieldChart';
import { MetricsDashboard } from '@/components/organism/MetricsDashboard';
import { MetricCardProps } from '@/components/molecules/MetricCard';

/**
 * シミュレーション結果のContainer
 * シミュレーション結果の取得、表示制御を担当
 */
export const SimulationResultContainer: React.FC = () => {
  const { results, loading, error } = useSimulationStore();

  // CashFlowChart用のデータ変換
  const cashFlowChartData: ChartData[] = React.useMemo(() => {
    if (!results) return [];
    return [
      {
        data: results.annualBalances.map((item) => ({
          year: item.year,
          value: item.value / 10000, // 円を万円に変換
        })),
        title: 'キャッシュフロー',
        unit: '万円',
        color: '#2563eb', // blue-600
      },
    ];
  }, [results]);

  // YieldChart用のデータ変換
  const yieldChartData: ChartData[] = React.useMemo(() => {
    if (!results) return [];
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

  // MetricsDashboard用のデータ変換
  const metricsData: Omit<MetricCardProps, 'trend'>[] = React.useMemo(() => {
    if (!results) return [];
    return [
      {
        title: '初年度税引前キャッシュフロー',
        value: results.preTaxCashFlows[0].value / 10000,
        unit: '万円',
        change: 0, // ドメイン層の変更が許可されていないため、変化率は計算できない
      },
      // その他の詳細指標は、domain/simulation/simulationService.tsのSimulationResults型にプロパティが追加された後に有効化します
    ];
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
