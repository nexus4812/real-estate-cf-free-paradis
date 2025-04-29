"use client";

import { useSimulationStore } from "@/store/usePropertyStore";
import { ChangeEvent } from "react";

/**
 * 築年数の入力コンポーネント
 */
export const AgeInput = () => {
  const { simulation, setData } = useSimulationStore();

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
        className="input-label flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
        築年数 (年):
      </label>
      <div className="relative">
        <input
          id="age"
          
          name="age"
          value={simulation.props.age}
          onChange={handleChange}
          className="input-field"
          min="0"
          placeholder="築年数を入力"
        />
      </div>
    </div>
  );
};
