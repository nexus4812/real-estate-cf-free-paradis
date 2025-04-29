"use client";

import { useSimulationStore } from "@/store/usePropertyStore";
import { ChangeEvent } from "react";

/**
 * 居率の入力コンポーネント
 */
export const OccupancyRateInput = () => {
  const { simulation, setData } = useSimulationStore();
  const handleChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    // 文字列から%を除去し、数値に変換
    const value = parseFloat(e.target.value.replace('%', ''));
    setData({ occupancyRate: value });
  };

  return (
    <div>
      <label htmlFor="occupancyRate">居率 (%):</label>
      <select
        id="occupancyRate"
        name="occupancyRate"
        value={`${simulation.props.occupancyRate}%`}
        onChange={handleChange}
      >
        <option value="100%">100%</option>
        <option value="95%">95%</option>
        <option value="90%">90%</option>
        <option value="85%">85%</option>
        <option value="80%">80%</option>
        <option value="75%">75%</option>
        <option value="70%">70%</option>
        <option value="65%">65%</option>
        <option value="60%">60%</option>
      </select>
    </div>
  );
};
