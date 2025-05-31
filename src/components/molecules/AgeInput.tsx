"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { useSimulationStore, SimulationInput } from "@/store/usePropertyStore";

/**
 * @typedef {Object} AgeInputProps
 * @property {UseFormRegister<SimulationInput>} register - React Hook Form の register 関数
 * @property {FieldErrors<SimulationInput>} errors - React Hook Form の errors オブジェクト
 */
interface AgeInputProps {
  register: UseFormRegister<SimulationInput>;
  errors: FieldErrors<SimulationInput>;
}

/**
 * 築年数の入力コンポーネントです。
 * React Hook Form の register と errors を props として受け取り、Zustand ストアと連携します。
 * @param {AgeInputProps} props - コンポーネントのプロパティ
 * @returns {JSX.Element}
 */
export const AgeInput = ({ register, errors }: AgeInputProps) => {
  const { setInput } = useSimulationStore();

  return (
    <div className="mb-2">
      <label
        htmlFor="constructionYear"
        className="input-label flex items-center text-xs mb-1"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
        築年数 (年):
      </label>
      <div className="relative">
        <input
          id="constructionYear"
          type="number"
          {...register("constructionYear", {
            required: "築年数は必須です",
            min: { value: 0, message: "0以上の値を入力してください" },
            valueAsNumber: true,
            onChange: (e) => setInput({ constructionYear: Number(e.target.value) })
          })}
          className={`input-field py-2 px-3 text-sm ${errors.constructionYear ? "border-red-500" : ""}`}
          placeholder="築年数を入力"
        />
      </div>
      {errors.constructionYear && <p className="text-red-500 text-xs mt-1">{errors.constructionYear.message}</p>}
    </div>
  );
};
