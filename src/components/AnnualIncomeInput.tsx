"use client";

import { useSimulationStore } from "@/store/usePropertyStore";
import { ChangeEvent } from "react";

/**
 * 年間収入の入力コンポーネント
 */
export const AnnualIncomeInput = () => {
  const { data, setData } = useSimulationStore();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = Number(e.target.value);
    if (!isNaN(value)) {
      setData({ annualIncome: value });
    }
  };

  return (
    <div>
      <label htmlFor="annualIncome">年間収入 (万円):</label>
      <input
        id="annualIncome"
        type="number"
        name="annualIncome"
        value={data.annualIncome}
        onChange={handleChange}
      />
    </div>
  );
};
