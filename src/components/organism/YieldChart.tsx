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
import { LoadingSpinner } from '@/components/molecules/LoadingSpinner';
import { ChartData } from './CashFlowChart'; // CashFlowChartで定義したChartData型を再利用

export type YieldChartProps = {
  data: ChartData[]; // 表面利回りと実質利回りの2つのデータセットを想定
  loading?: boolean;
  height?: number;
};

/**
 * 利回りグラフコンポーネント
 * @param props - YieldChartProps
 * @returns JSX.Element
 */
export const YieldChart: React.FC<YieldChartProps> = ({
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
  if (!data || data.length === 0 || data.every(d => d.data.length === 0)) {
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
      <h3 className="section-title">利回り推移</h3>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="year"
            label={{ value: '年', position: 'insideBottom', offset: -5 }}
            allowDuplicatedCategory={false} // 重複カテゴリを許可しない
          />
          <YAxis
            label={{ value: '利回り（%）', angle: -90, position: 'insideLeft' }}
            tickFormatter={(value) => `${value.toLocaleString()}%`}
          />
          <Tooltip
            formatter={(value: number, name: string, props: any) => [`${value.toLocaleString()}%`, name]}
            labelFormatter={(label) => `${label}年目`}
          />
          <Legend />
          {data.map((s, index) => (
            <Line
              key={s.title}
              type="monotone"
              dataKey="value"
              data={s.data}
              name={s.title}
              stroke={s.color}
              strokeWidth={2}
              dot={{ fill: s.color, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};
