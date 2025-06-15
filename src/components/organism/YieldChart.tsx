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
import { ChartData } from '@/types/chart'; // ChartDataをインポート

export type YieldChartProps = {
  data: ChartData[]; // ChartData[]型
  loading?: boolean;
  height?: number;
};

/**
 * 利回りグラフコンポーネント
 * 表面利回り、実質利回りの推移を表示します。
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
      <Card>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className={`h-${height} bg-gray-200 rounded`}></div>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <h3 className="section-title">利回り推移</h3>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data[0]?.data || []}> {/* 最初のChartDataオブジェクトのdataプロパティを使用 */}
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="year"
            label={{ value: '年', position: 'insideBottom', offset: -5 }}
          />
          <YAxis
            label={{ value: '利回り（%）', angle: -90, position: 'insideLeft' }}
            tickFormatter={(value) => `${value.toFixed(1)}%`}
          />
          <Tooltip
            formatter={(value: number, name: string) => [`${value.toFixed(2)}%`, name]}
            labelFormatter={(label) => `${label}年目`}
          />
          <Legend />
          {data.map((chartItem, index) => (
            <Line
              key={index}
              type="monotone"
              dataKey="value"
              name={chartItem.title}
              stroke={chartItem.color}
              strokeWidth={2}
              dot={{ fill: chartItem.color, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};
