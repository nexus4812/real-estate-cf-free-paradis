"use client";

import { useSimulationStore } from "@/store/usePropertyStore";
import { ChangeEvent } from "react";

/**
 * 自己資金の入力コンポーネント
 */
export const SelfFundsInput = () => {
  const { data, setData } = useSimulationStore();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = Number(e.target.value);
    if (!isNaN(value)) {
      setData({ selfFunds: value });
    }
  };

  return (
    <div>
      <label htmlFor="selfFunds">自己資金 (万円):</label>
      <input
        id="selfFunds"
        type="number"
        name="selfFunds"
        value={data.selfFunds}
        onChange={handleChange}
      />
    </div>
  );
};
