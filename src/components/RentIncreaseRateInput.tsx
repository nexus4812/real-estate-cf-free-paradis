"use client";

import { useSimulationStore } from "@/store/usePropertyStore";
import { ChangeEvent } from "react";

/**
 * 家賃増減率の選択コンポーネント
 */
export const RentIncreaseRateInput = () => {
  const { data, setData } = useSimulationStore();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setData({ rentIncreaseRate: e.target.value });
  };

  return (
    <div>
      <label htmlFor="rentIncreaseRate">家賃増減率 (%/年):</label>
      <select
        id="rentIncreaseRate"
        name="rentIncreaseRate"
        value={data.rentIncreaseRate}
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
