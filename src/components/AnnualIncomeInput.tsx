"use client";

import { useSimulationStore } from "@/store/usePropertyStore";

/**
 * 年間収入の入力コンポーネント
 */
export const AnnualIncomeInput = () => {
  const { simulation } = useSimulationStore();

  return (
    <div>
        <label htmlFor="annualIncome">初年度年間収入 (万円):</label>
        {simulation.calculateAnnualIncome()}
    </div>
  );
};
