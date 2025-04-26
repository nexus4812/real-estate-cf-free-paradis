"use client";

import { useSimulationStore } from "@/store/usePropertyStore";
import { ChangeEvent } from "react";

/**
 * 物件構造の選択コンポーネント
 */
export const StructureInput = () => {
  const { data, setData } = useSimulationStore();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setData({ structure: e.target.value });
  };

  return (
    <div className="mb-4">
      <label 
        htmlFor="structure" 
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        物件構造:
      </label>
      <select
        id="structure"
        name="structure"
        value={data.structure}
        onChange={handleChange}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
      >
        <option value="RC">RC造</option>
        <option value="SRC">SRC造</option>
        <option value="Steel">鉄骨造</option>
        <option value="Wood">木造</option>
      </select>
    </div>
  );
};
