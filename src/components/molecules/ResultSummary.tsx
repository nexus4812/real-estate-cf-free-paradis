import React from 'react';
import { Card } from '@/components/atoms/Card';
import { Text } from '@/components/atoms/Text';

export type ResultSummaryProps = {
  totalPayment: number;
  initialIncome: number;
  cashFlow: number;
  yield: number;
};

/**
 * シミュレーション結果のサマリーを表示するコンポーネント
 * @param props - ResultSummaryProps
 * @returns JSX.Element
 */
export const ResultSummary: React.FC<ResultSummaryProps> = ({
  totalPayment,
  initialIncome,
  cashFlow,
  yield: yieldValue, // 'yield' は予約語なので別名にする
}) => {
  return (
    <Card>
      <h3 className="section-title">シミュレーション結果サマリー</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Text size="sm" color="gray" className="font-medium">
            総支払額
          </Text>
          <Text size="lg" weight="bold" className="text-blue-700">
            {totalPayment.toLocaleString()} 万円
          </Text>
        </div>
        <div>
          <Text size="sm" color="gray" className="font-medium">
            初年度収入
          </Text>
          <Text size="lg" weight="bold" className="text-green-700">
            {initialIncome.toLocaleString()} 万円
          </Text>
        </div>
        <div>
          <Text size="sm" color="gray" className="font-medium">
            年間キャッシュフロー
          </Text>
          <Text size="lg" weight="bold" className="text-purple-700">
            {cashFlow.toLocaleString()} 万円
          </Text>
        </div>
        <div>
          <Text size="sm" color="gray" className="font-medium">
            利回り
          </Text>
          <Text size="lg" weight="bold" className="text-orange-700">
            {yieldValue.toFixed(2)} %
          </Text>
        </div>
      </div>
    </Card>
  );
};
