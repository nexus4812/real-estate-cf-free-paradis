"use client";

import { useSimulationStore } from "@/store/usePropertyStore";
import { ChangeEvent } from "react";

/**
 * 家賃増減率の選択コンポーネント
 */
export const RentIncreaseRateInput = () => {
  const { simulation, setData } = useSimulationStore();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    // 文字列から%を除去し、数値に変換
    const value = parseFloat(e.target.value.replace('%', '')) / 100;
    setData({ rentIncreaseRate: value });
  };

  return (
    <div>
      <label htmlFor="rentIncreaseRate">家賃増減率 (%/年):</label>
      <select
        id="rentIncreaseRate"
        name="rentIncreaseRate"
        value={`${(simulation.props.rentIncreaseRate * 100).toFixed(1)}%`}
        onChange={handleChange}
      >
        <option value="-5%">-5%</option>
        <option value="-4.5%">-4.5%</option>
        <option value="-4%">-4%</option>
        <option value="-3.5%">-3.5%</option>
        <option value="-3%">-3%</option>
        <option value="-2.5%">-2.5%</option>
        <option value="-2%">-2%</option>
        <option value="-1.5%">-1.5%</option>
        <option value="-1%">-1%</option>
        <option value="-0.5%">-0.5%</option>
        <option value="0%">0%</option>
        <option value="0.5%">0.5%</option>
        <option value="1%">1%</option>
        <option value="1.5%">1.5%</option>
        <option value="2%">2%</option>
      </select>
    </div>
  );
};
