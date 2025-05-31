'use client';

import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Line,
  ComposedChart
} from 'recharts';
import { useSimulationStore } from '@/store/usePropertyStore';

/**
 * シミュレーションのグラフを表示するコンポーネント
 */
export const SimulationChart = () => {
  const { input, results } = useSimulationStore();

  // シミュレーション期間（年数）
  const SIMULATION_YEARS = 35; // この値はどこかで定義されるべきだが、ここでは固定値とする

  // 減価償却年数を取得
  const depreciationYears = useMemo(() => {
    return input.structure.getDepreciationYears();
  }, [input.structure]);

  // 減価償却終了年（築年数 + 減価償却年数）
  const depreciationEndYear = useMemo(() => {
    return Math.min(input.constructionYear + depreciationYears, SIMULATION_YEARS);
  }, [input.constructionYear, depreciationYears]);

  // グラフデータの生成
  const chartData = useMemo(() => {
    if (!results.annualBalances || !results.grossYields || !results.realYields) {
      return [];
    }

    let cumulativeCF = 0;
    return results.annualBalances.map((dataPoint, index) => {
      cumulativeCF += dataPoint.value;
      return {
        year: `${dataPoint.year}年目`,
        annualBalance: dataPoint.value,
        cumulativeCF: cumulativeCF,
        grossYield: results.grossYields[index]?.value,
        realYield: results.realYields[index]?.value,
        isDepreciationEnd: dataPoint.year === depreciationEndYear
      };
    });
  }, [results.annualBalances, results.grossYields, results.realYields, depreciationEndYear]);

  // 表示用にフォーマットする関数
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP').format(amount);
  };

  // ツールチップのカスタマイズ
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-md rounded-md">
          <p className="font-semibold">{label}</p>
          {payload.map((entry: any, index: number) => {
            let labelText = '';
            if (entry.name === 'annualBalance') {
              labelText = '年間収支: ';
            } else if (entry.name === 'cumulativeCF') {
              labelText = '累積CF: ';
            } else if (entry.name === 'grossYield') {
              labelText = '表面利回り: ';
            } else if (entry.name === 'realYield') {
              labelText = '実質利回り: ';
            }
            return (
              <p key={`item-${index}`} style={{ color: entry.color }}>
                {labelText}
                {entry.name === 'grossYield' || entry.name === 'realYield' ? `${(entry.value * 100).toFixed(2)}%` : `${formatCurrency(entry.value)} 円`}
              </p>
            );
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-4">
      <h3 className="text-2xl font-bold mb-6 text-center text-gray-800 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3 3a1 1 0 000 2h10a1 1 0 100-2H3zm0 4a1 1 0 000 2h6a1 1 0 100-2H3zm0 4a1 1 0 100 2h8a1 1 0 100-2H3zm10 5a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z" clipRule="evenodd" />
        </svg>
        キャッシュフロー推移
      </h3>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis 
                yAxisId="left"
                orientation="left"
                tickFormatter={(value) => `${value / 10000}万`}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                tickFormatter={(value) => `${value / 10000}万`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar 
                yAxisId="left"
                dataKey="annualBalance" 
                name="年間収支" 
                fill="#8884d8" 
                barSize={20}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="cumulativeCF" 
                name="累積CF" 
                stroke="#82ca9d" 
                strokeWidth={2}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="grossYield"
                name="表面利回り"
                stroke="#ffc658"
                strokeWidth={2}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="realYield"
                name="実質利回り"
                stroke="#ff7300"
                strokeWidth={2}
              />
              {/* 減価償却終了年のリファレンスライン */}
              <ReferenceLine
                x={`${depreciationEndYear}年目`}
                stroke="red"
                strokeDasharray="3 3"
                label={{ value: '減価償却終了', position: 'insideTopRight', fill: 'red', fontSize: 12 }}
                yAxisId="left"
              />
              {/* 収支0のリファレンスライン */}
              <ReferenceLine
                yAxisId="left"
                y={0}
                stroke="#666"
                strokeDasharray="3 3"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h4 className="text-md font-semibold mb-2 text-gray-700">グラフ説明</h4>
        <ul className="list-disc pl-5 text-sm text-gray-600">
          <li className="mb-1">
            <span className="font-medium text-purple-600">棒グラフ（年間収支）</span>：各年の収入から支出を引いた年間の収支を表示
          </li>
          <li className="mb-1">
            <span className="font-medium text-green-600">折れ線グラフ（累積CF）</span>：年間収支の累積額を表示
          </li>
          <li className="mb-1">
            <span className="font-medium text-yellow-600">折れ線グラフ（表面利回り）</span>：各年の表面利回りを表示
          </li>
          <li className="mb-1">
            <span className="font-medium text-orange-600">折れ線グラフ（実質利回り）</span>：各年の実質利回りを表示
          </li>
          <li className="mb-1">
            <span className="font-medium text-red-600">赤い点線</span>：減価償却終了年（{depreciationEndYear}年目）
          </li>
        </ul>
      </div>
    </div>
  );
};
