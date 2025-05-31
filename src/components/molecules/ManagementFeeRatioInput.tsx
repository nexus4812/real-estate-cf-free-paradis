import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { SimulationInput } from '@/store/usePropertyStore';

/**
 * @typedef {Object} ManagementFeeRatioInputProps
 * @property {UseFormRegister<SimulationInput>} register - React Hook Form の register 関数
 * @property {FieldErrors<SimulationInput>} errors - React Hook Form の errors オブジェクト
 */
interface ManagementFeeRatioInputProps {
  register: UseFormRegister<SimulationInput>;
  errors: FieldErrors<SimulationInput>;
}

/**
 * 管理費率の入力コンポーネントです。
 * @param {ManagementFeeRatioInputProps} props - コンポーネントのプロパティ
 */
export const ManagementFeeRatioInput = ({ register, errors }: ManagementFeeRatioInputProps) => {
  return (
    <div className="form-control w-full max-w-xs">
      <label htmlFor="managementFeeRatio" className="label">
        <span className="label-text">管理費率 (%)</span>
      </label>
      <input
        id="managementFeeRatio"
        type="number"
        step="0.01"
        {...register('managementFeeRatio', {
          required: '管理費率は必須です',
          min: { value: 0, message: '0以上の値を入力してください' },
          max: { value: 100, message: '100以下の値を入力してください' },
          valueAsNumber: true,
        })}
        className={`input input-bordered w-full max-w-xs ${errors.managementFeeRatio ? 'input-error' : ''}`}
      />
      {errors.managementFeeRatio && (
        <p className="text-error text-xs mt-1">{errors.managementFeeRatio.message}</p>
      )}
    </div>
  );
};
