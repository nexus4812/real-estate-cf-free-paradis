"use client";

import { Structure } from "@/domain/values/structure";
import { useSimulationStore } from "@/store/usePropertyStore";
import { ChangeEvent } from "react";

/**
 * 物件構造の選択コンポーネント
 */
export const StructureInput = () => {
  const { simulation, update } = useSimulationStore();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    update((data) => {
      data.props.structure = Structure.create(e.target.value)
    })
  };

  return (
    <div className="mb-2">
      <label
        htmlFor="structure"
        className="input-label flex items-center text-xs mb-1"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
          <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
        </svg>
        物件構造:
      </label>
      <select
        id="structure"
        name="structure"
        value={simulation.props.structure.type ?? ""}
        onChange={handleChange}
        className="input-field py-2 px-3 text-sm"
      >
        {Structure.all().map(item => (<option key={item.value} value={item.value}>{item.getReadableName()}</option>))}
      </select>
    </div>
  );
};
