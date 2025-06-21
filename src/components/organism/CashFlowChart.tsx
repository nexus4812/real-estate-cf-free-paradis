import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card } from '@/components/atoms/Card';
import { LoadingSpinner } from '@/components/molecules/LoadingSpinner'; // LoadingSpinnerをインポート

import { ChartData } from '@/types/chart';

export type CashFlowChartProps = {
  data: ChartData[];
  loading?: boolean;
  height?: number;
};

/**
 * キャッシュフロー推移グラフコンポーネント
 * @param props - CashFlowChartProps
 * @returns JSX.Element
 */
export const CashFlowChart: React.FC<CashFlowChartProps> = ({
  data,
  loading = false,
  height = 400,
}) => {
  if (loading) {
    return (
      <Card className="flex items-center justify-center h-full min-h-[400px]">
        <LoadingSpinner message="チャートを読み込み中..." />
      </Card>
    );
  }

  return (
    <Card>
      <h3 className="section-title">キャッシュフロー推移</h3>
      {data.length > 0 && (
        <ResponsiveContainer width="100%" height={height}>
          <LineChart data={data[0]?.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="year"
              label={{ value: '年', position: 'insideBottom', offset: -5 }}
            />
            <YAxis
              label={{ value: '金額（万円）', angle: -90, position: 'insideLeft' }}
              tickFormatter={(value) => `${value.toLocaleString()}`}
            />
            <Tooltip
              formatter={(value: number) => [`${value.toLocaleString()}万円`, data[0]?.title]}
              labelFormatter={(label) => `${label}年目`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke={data[0]?.color}
              strokeWidth={2}
              dot={{ fill: data[0]?.color, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
              name={data[0]?.title}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
};
