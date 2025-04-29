"use client";

import { useSimulationStore } from "@/store/usePropertyStore";
import { ChangeEvent } from "react";

/**
 * ローン期間の入力コンポーネント
 */
export const LoanTermInput = () => {
  const { simulation, setData } = useSimulationStore();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = Number(e.target.value);
    if (!isNaN(value)) {
      setData({ loanTerm: value });
    }
  };

  return (
    <div className="mb-4">
      <label
        htmlFor="loanTerm"
        className="input-label flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
        </svg>
        ローン期間 (年):
      </label>
      <div className="relative">
        <input
          id="loanTerm"
          
          name="loanTerm"
          value={simulation.props.loanTerm}
          onChange={handleChange}
          className="input-field"
          min="1"
          max="50"
          placeholder="ローン期間を入力"
        />
      </div>
    </div>
  );
};
