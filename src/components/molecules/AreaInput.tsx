"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { useSimulationStore, SimulationInput } from "@/store/usePropertyStore";

/**
 * @typedef {Object} AreaInputProps
 * @property {UseFormRegister<SimulationInput>} register - React Hook Form の register 関数
 * @property {FieldErrors<SimulationInput>} errors - React Hook Form の errors オブジェクト
 */
interface AreaInputProps {
  register: UseFormRegister<SimulationInput>;
  errors: FieldErrors<SimulationInput>;
}

/**
 * 建物面積の入力コンポーネントです。
 * React Hook Form の register と errors を props として受け取り、Zustand ストアと連携します。
 * @param {AreaInputProps} props - コンポーネントのプロパティ
 * @returns {JSX.Element}
 */
export const AreaInput = ({ register, errors }: AreaInputProps) => {
  const { setInput } = useSimulationStore();

  return (
    <div className="mb-2">
      <label
        htmlFor="buildingArea"
        className="input-label flex items-center text-xs mb-1"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
        </svg>
        建物面積 (㎡):
      </label>
      <div className="relative">
        <input
          id="buildingArea"
          type="number"
          {...register("buildingArea", {
            required: "建物面積は必須です",
            min: { value: 0, message: "0以上の値を入力してください" },
            valueAsNumber: true,
          })}
          className={`input-field py-2 px-3 text-sm ${errors.buildingArea ? "border-red-500" : ""}`}
          placeholder="建物面積を入力"
        />
      </div>
      {errors.buildingArea && <p className="text-red-500 text-xs mt-1">{errors.buildingArea.message}</p>}
    </div>
  );
};
