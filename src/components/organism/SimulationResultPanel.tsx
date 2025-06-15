import React from 'react';
import { Card } from '@/components/atoms/Card';
import { MetricCard } from '@/components/molecules/MetricCard';
import { ResultSummary } from '@/components/molecules/ResultSummary';
import { ErrorMessage } from '@/components/molecules/ErrorMessage';
import { LoadingSpinner } from '@/components/molecules/LoadingSpinner';
import { SimulationResult } from '@/domain/simulation/simulationService'; // 仮の型定義

export type SimulationResultPanelProps = {
  results: SimulationResult | null;
  loading: boolean;
  error: string | null;
};

/**
 * シミュレーション結果表示パネルコンポーネント
 * シミュレーション結果のサマリーと詳細指標を表示します。
 * @param props - SimulationResultPanelProps
 * @returns JSX.Element
 */
export const SimulationResultPanel: React.FC<SimulationResultPanelProps> = ({
  results,
  loading,
  error,
}) => {
  if (loading) {
    return (
      <Card>
        <LoadingSpinner message="シミュレーション結果を計算中..." />
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <ErrorMessage message={error} type="error" />
      </Card>
    );
  }

  if (!results) {
    return (
      <Card>
        <ErrorMessage message="シミュレーションを実行してください。" type="info" />
      </Card>
    );
  }

  // 仮のメトリックデータ。実際のresultsから計算する
  const metrics = [
    { title: '年間家賃収入', value: results.annualIncome[0].value / 10000, unit: '万円', change: 0.02, trend: 'up' as const },
    { title: '年間支出', value: results.annualCost[0].value / 10000, unit: '万円', change: -0.01, trend: 'down' as const },
    { title: '年間キャッシュフロー', value: results.annualCashFlow[0].value / 10000, unit: '万円', change: 0.03, trend: 'up' as const },
    { title: '表面利回り', value: results.surfaceYield * 100, unit: '%', change: 0, trend: 'neutral' as const },
  ];

  return (
    <Card>
      <h3 className="section-title">シミュレーション結果</h3>
      <ResultSummary
        totalPayment={results.totalPayment / 10000}
        initialIncome={results.annualIncome[0].value / 10000}
        cashFlow={results.annualCashFlow[0].value / 10000}
        yield={results.surfaceYield * 100}
      />

      <div className="mt-8">
        <h4 className="text-lg font-semibold text-gray-700 mb-4">主要指標</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>
      </div>
    </Card>
  );
};
