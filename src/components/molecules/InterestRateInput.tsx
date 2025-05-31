"use client";

import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { useSimulationStore, SimulationInput } from '@/store/usePropertyStore'; // useSimulationStore をインポート

/**
 * @typedef {Object} InterestRateInputProps
 * @property {UseFormRegister<SimulationInput>} register - React Hook Form の register 関数
 * @property {FieldErrors<SimulationInput>} errors - React Hook Form の errors オブジェクト
 */
interface InterestRateInputProps {
  register: UseFormRegister<SimulationInput>;
  errors: FieldErrors<SimulationInput>;
}

/**
 * 金利の入力コンポーネントです。
 * @param {InterestRateInputProps} props - コンポーネントのプロパティ
 */
export const InterestRateInput = ({ register, errors }: InterestRateInputProps) => {
  const { setInput } = useSimulationStore(); // setInput を取得

  return (
    <div className="form-control w-full max-w-xs">
      <label htmlFor="interestRate" className="label">
        <span className="label-text">金利 (%)</span>
      </label>
      <input
        id="interestRate"
        type="number"
        step="0.01"
        {...register('interestRate', {
          required: '金利は必須です',
          min: { value: 0, message: '0以上の値を入力してください' },
          valueAsNumber: true,
        })}
        className={`input input-bordered w-full max-w-xs ${errors.interestRate ? 'input-error' : ''}`}
      />
      {errors.interestRate && (
        <p className="text-error text-xs mt-1">{errors.interestRate.message}</p>
      )}
    </div>
  );
};
