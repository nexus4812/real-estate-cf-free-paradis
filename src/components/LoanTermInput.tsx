"use client";

import { useSimulationStore } from "@/store/usePropertyStore";
import { ChangeEvent } from "react";

/**
 * ローン期間の入力コンポーネント
 */
export const LoanTermInput = () => {
  const { data, setData } = useSimulationStore();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = Number(e.target.value);
    if (!isNaN(value)) {
      setData({ loanTerm: value });
    }
  };

  return (
    <div>
      <label htmlFor="loanTerm">ローン期間 (年):</label>
      <input
        id="loanTerm"
        type="number"
        name="loanTerm"
        value={data.loanTerm}
        onChange={handleChange}
      />
    </div>
  );
};
