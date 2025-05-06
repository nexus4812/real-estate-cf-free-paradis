"use client";

import { useSimulationStore } from "@/store/usePropertyStore";

/**
 * 年間収入の入力コンポーネント
 */
export const AnnualIncomeInput = () => {
  const { simulation } = useSimulationStore();
  
  // 年間収入を計算
  const annualIncome = simulation.calculateAnnualIncome();
  
  // 表示用にフォーマットする関数
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP').format(amount);
  };

  return (
    <div>
      <label htmlFor="annualIncome" className="block text-sm font-medium text-gray-700 mb-1">初年度年間収入:</label>
      <div className="relative rounded-md shadow-sm">
        <div className="p-2 block w-full border border-gray-300 bg-gray-100 rounded-md">
          {formatCurrency(annualIncome)} 円
        </div>
        <div className="text-xs text-gray-500 mt-1">
          物件価格と利回りから自動計算されます
        </div>
      </div>
    </div>
  );
};
