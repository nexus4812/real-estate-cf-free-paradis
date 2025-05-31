"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { useSimulationStore, SimulationInput } from "@/store/usePropertyStore";
import { BuildingStructure, RC, Steel, Wood } from "@/domain/property/buildingStructure";

/**
 * @typedef {Object} StructureInputProps
 * @property {UseFormRegister<SimulationInput>} register - React Hook Form の register 関数
 * @property {FieldErrors<SimulationInput>} errors - React Hook Form の errors オブジェクト
 */
interface StructureInputProps {
  register: UseFormRegister<SimulationInput>;
  errors: FieldErrors<SimulationInput>;
}

/**
 * 物件構造の選択コンポーネントです。
 * React Hook Form の register と errors を props として受け取り、Zustand ストアと連携します。
 * @param {StructureInputProps} props - コンポーネントのプロパティ
 * @returns {JSX.Element}
 */
export const StructureInput = ({ register, errors }: StructureInputProps) => {
  const { setInput } = useSimulationStore();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    let structure: BuildingStructure;
    switch (e.target.value) {
      case "RC":
        structure = new RC();
        break;
      case "Steel":
        structure = new Steel();
        break;
      case "Wood":
        structure = new Wood();
        break;
      default:
        structure = new RC(); // デフォルト値
    }
    setInput({ structure });
  };

  const structureOptions = [
    { value: "RC", label: "RC造" },
    { value: "Steel", label: "S造" },
    { value: "Wood", label: "木造" },
  ];

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
        {...register("structure", {
          required: "物件構造は必須です",
          onChange: handleChange,
        })}
        className={`input-field py-2 px-3 text-sm ${errors.structure ? "border-red-500" : ""}`}
      >
        {structureOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors.structure && <p className="text-red-500 text-xs mt-1">{errors.structure.message}</p>}
    </div>
  );
};
