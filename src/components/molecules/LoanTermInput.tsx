"use client";

import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { useSimulationStore, SimulationInput } from '@/store/usePropertyStore'; // useSimulationStore をインポート

/**
 * @typedef {Object} LoanTermInputProps
 * @property {UseFormRegister<SimulationInput>} register - React Hook Form の register 関数
 * @property {FieldErrors<SimulationInput>} errors - React Hook Form の errors オブジェクト
 */
interface LoanTermInputProps {
  register: UseFormRegister<SimulationInput>;
  errors: FieldErrors<SimulationInput>;
}

/**
 * ローン期間の入力コンポーネントです。
 * @param {LoanTermInputProps} props - コンポーネントのプロパティ
 */
export const LoanTermInput = ({ register, errors }: LoanTermInputProps) => {
  const { setInput } = useSimulationStore(); // setInput を取得

  return (
    <div className="form-control w-full max-w-xs">
      <label htmlFor="loanTerm" className="label">
        <span className="label-text">ローン期間 (年)</span>
      </label>
      <input
        id="loanTerm"
        type="number"
        {...register('loanTerm', {
          required: 'ローン期間は必須です',
          min: { value: 1, message: '1年以上の値を入力してください' },
          max: { value: 50, message: '50年以下の値を入力してください' },
          valueAsNumber: true,
        })}
        className={`input input-bordered w-full max-w-xs ${errors.loanTerm ? 'input-error' : ''}`}
      />
      {errors.loanTerm && (
        <p className="text-error text-xs mt-1">{errors.loanTerm.message}</p>
      )}
    </div>
  );
};
