"use client";

import { useSimulationStore } from "@/store/usePropertyStore";
import { ChangeEvent } from "react";

/**
 * 建物面積の入力コンポーネント
 */
export const AreaInput = () => {
  const { simulation, setData } = useSimulationStore();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = Number(e.target.value);
    if (!isNaN(value)) {
      setData({ area: value });
    }
  };

  return (
    <div className="mb-2">
      <label
        htmlFor="area"
        className="input-label flex items-center text-xs mb-1"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
        </svg>
        建物面積 (㎡):
      </label>
      <div className="relative">
        <input
          id="area"
          name="area"
          value={simulation.props.area}
          onChange={handleChange}
          className="input-field py-2 px-3 text-sm"
          min="0"
          placeholder="建物面積を入力"
        />
      </div>
    </div>
  );
};
