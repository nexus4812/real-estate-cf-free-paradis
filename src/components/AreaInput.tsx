"use client";

import { useSimulationStore } from "@/store/usePropertyStore";
import { ChangeEvent } from "react";

/**
 * 建物面積の入力コンポーネント
 */
export const AreaInput = () => {
  const { data, setData } = useSimulationStore();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = Number(e.target.value);
    if (!isNaN(value)) {
      setData({ area: value });
    }
  };

  return (
    <div>
      <label htmlFor="area">建物面積 (㎡):</label>
      <input
        id="area"
        type="number"
        name="area"
        value={data.area}
        onChange={handleChange}
      />
    </div>
  );
};
