'use client';

import { useSimulationStore } from '@/store/usePropertyStore';

/**
 * 年間収入の表示コンポーネントです。
 * ストアから取得した初年度年間収入を表示します。
 */
export const AnnualIncomeInput = () => {
  const { results } = useSimulationStore();

  /**
   * 数値を通貨形式にフォーマットします。
   * @param {number} amount - フォーマットする数値
   * @returns {string} フォーマットされた文字列
   */
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('ja-JP').format(amount);
  };

  const annualIncome = results.initialAnnualIncome;

  return (
    <div>
      <label htmlFor="annualIncome" className="block text-sm font-medium text-gray-700 mb-1">
        初年度年間収入:
      </label>
      <div className="relative rounded-md shadow-sm">
        <div className="p-2 block w-full border border-gray-300 bg-gray-100 rounded-md">
          {formatCurrency(annualIncome)} 円
        </div>
        <div className="text-xs text-gray-500 mt-1">物件価格と利回りから自動計算されます</div>
      </div>
    </div>
  );
};
