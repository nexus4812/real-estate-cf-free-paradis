"use client";

import { useSimulationStore } from "@/store/usePropertyStore";
import { ChangeEvent } from "react";

/**
 * 年間経費の入力コンポーネント
 */
export const AnnualCostInput = () => {
  const { simulation, setData } = useSimulationStore();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = Number(e.target.value);
    if (!isNaN(value)) {
      setData({ annualCost: value });
    }
  };

  return (
    <div>
      <label htmlFor="annualCost">年間経費 (万円):</label>
      <input
        id="annualCost"
        type="number"
        name="annualCost"
        value={simulation.props.annualCost}
        onChange={handleChange}
      />
    </div>
  );
};
