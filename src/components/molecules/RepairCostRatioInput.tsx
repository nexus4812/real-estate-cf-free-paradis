import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { SimulationInput } from '@/store/usePropertyStore';

/**
 * @typedef {Object} RepairCostRatioInputProps
 * @property {UseFormRegister<SimulationInput>} register - React Hook Form の register 関数
 * @property {FieldErrors<SimulationInput>} errors - React Hook Form の errors オブジェクト
 */
interface RepairCostRatioInputProps {
  register: UseFormRegister<SimulationInput>;
  errors: FieldErrors<SimulationInput>;
}

/**
 * 修繕費率の入力コンポーネントです。
 * @param {RepairCostRatioInputProps} props - コンポーネントのプロパティ
 */
export const RepairCostRatioInput = ({ register, errors }: RepairCostRatioInputProps) => {
  return (
    <div className="form-control w-full max-w-xs">
      <label htmlFor="repairCostRatio" className="label">
        <span className="label-text">修繕費率 (%)</span>
      </label>
      <input
        id="repairCostRatio"
        type="number"
        step="0.01"
        {...register('repairCostRatio', {
          required: '修繕費率は必須です',
          min: { value: 0, message: '0以上の値を入力してください' },
          max: { value: 100, message: '100以下の値を入力してください' },
          valueAsNumber: true,
        })}
        className={`input input-bordered w-full max-w-xs ${errors.repairCostRatio ? 'input-error' : ''}`}
      />
      {errors.repairCostRatio && (
        <p className="text-error text-xs mt-1">{errors.repairCostRatio.message}</p>
      )}
    </div>
  );
};
