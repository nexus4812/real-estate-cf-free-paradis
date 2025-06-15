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

// ChartDataの型定義はtechnical-reference.mdに記載されているが、ここでは直接定義する
export type ChartDataPoint = {
  year: number;
  value: number;
  label?: string;
};

export type ChartData = {
  data: ChartDataPoint[];
  title: string;
  unit: string;
  color: string;
};

export type CashFlowChartProps = {
  data: ChartData[];
  loading?: boolean;
  height?: number;
};

/**
 * キャッシュフローグラフコンポーネント
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
      <Card padding="md" shadow="sm" border>
        <LoadingSpinner message="グラフデータを読み込み中..." />
      </Card>
    );
  }

  // dataが空の場合の表示
  if (!data || data.length === 0 || data[0].data.length === 0) {
    return (
      <Card padding="md" shadow="sm" border>
        <div className="flex items-center justify-center h-full min-h-[200px]">
          <p className="text-gray-500">表示するデータがありません。</p>
        </div>
      </Card>
    );
  }

  return (
    <Card padding="md" shadow="sm" border>
      <h3 className="section-title">キャッシュフロー推移</h3>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data[0].data}> {/* 最初のデータセットのみを使用 */}
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="year"
            label={{ value: '年', position: 'insideBottom', offset: -5 }}
          />
          <YAxis
            label={{ value: `金額（${data[0].unit}）`, angle: -90, position: 'insideLeft' }}
            tickFormatter={(value) => `${value.toLocaleString()}`}
          />
          <Tooltip
            formatter={(value: number) => [`${value.toLocaleString()}${data[0].unit}`, data[0].title]}
            labelFormatter={(label) => `${label}年目`}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke={data[0].color}
            strokeWidth={2}
            dot={{ fill: data[0].color, strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};
