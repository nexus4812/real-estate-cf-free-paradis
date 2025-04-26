"use client";

import { useSimulationStore } from "@/store/usePropertyStore";
import { ChangeEvent } from "react";

/**
 * 築年数の入力コンポーネント
 */
export const AgeInput = () => {
  const { data, setData } = useSimulationStore();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = Number(e.target.value);
    if (!isNaN(value)) {
      setData({ age: value });
    }
  };

  return (
    <div className="mb-4">
      <label 
        htmlFor="age" 
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        築年数 (年):
      </label>
      <input
        id="age"
        type="number"
        name="age"
        value={data.age}
        onChange={handleChange}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        min="0"
      />
    </div>
  );
};
