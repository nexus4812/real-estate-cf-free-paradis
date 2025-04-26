"use client";

import { useSimulationStore } from "@/store/usePropertyStore";
import { ChangeEvent } from "react";

/**
 * 金利の入力コンポーネント
 */
export const InterestRateInput = () => {
  const { data, setData } = useSimulationStore();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = Number(e.target.value);
    if (!isNaN(value)) {
      setData({ interestRate: value });
    }
  };

  return (
    <div>
      <label htmlFor="interestRate">金利 (%):</label>
      <input
        id="interestRate"
        type="number"
        name="interestRate"
        value={data.interestRate}
        onChange={handleChange}
      />
    </div>
  );
};
