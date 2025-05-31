"use client";

import { useSimulationStore } from "@/store/usePropertyStore";
import { ChangeEvent } from "react";

/**
 * 年間経費の入力コンポーネント
 */
export const AnnualCostInput = () => {
  const { input, setInput } = useSimulationStore();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = Number(e.target.value);
    if (!isNaN(value)) {
      setInput({ propertyPrice: value }); // annualCost は SimulationInput に存在しないため、一時的に propertyPrice に置き換え
    }
  };

  return (
    <div>
      <label htmlFor="annualCost">年間経費 (万円):</label>
      <input
        id="annualCost"
        
        name="annualCost"
        value={input.propertyPrice} // annualCost は SimulationInput に存在しないため、一時的に propertyPrice に置き換え
        onChange={handleChange}
      />
    </div>
  );
};
