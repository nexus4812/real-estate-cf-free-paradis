'use client';

import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { SimulationInput } from '@/store/useSimulationStore';

/**
 * @typedef {Object} OccupancyRateInputProps
 * @property {UseFormRegister<SimulationInput>} register - React Hook Form の register 関数
 * @property {FieldErrors<SimulationInput>} errors - React Hook Form の errors オブジェクト
 */
interface OccupancyRateInputProps {
  register: UseFormRegister<SimulationInput>;
  errors: FieldErrors<SimulationInput>;
}

/**
 * 入居率の入力コンポーネントです。
 * @param {OccupancyRateInputProps} props - コンポーネントのプロパティ
 */
export const OccupancyRateInput = ({ register, errors }: OccupancyRateInputProps) => {
  // SimulationInput の vacancyRate (空室率) に対応するため、入居率を空室率に変換して扱う
  const options = [
    { value: 0, label: '100%' }, // 空室率0% = 入居率100%
    { value: 0.05, label: '95%' },
    { value: 0.1, label: '90%' },
    { value: 0.15, label: '85%' },
    { value: 0.2, label: '80%' },
    { value: 0.25, label: '75%' },
    { value: 0.3, label: '70%' },
    { value: 0.35, label: '65%' },
    { value: 0.4, label: '60%' },
  ];

  return (
    <div className="form-control w-full max-w-xs">
      <label htmlFor="vacancyRate" className="label">
        <span className="label-text">入居率 (%)</span>
      </label>
      <select
        id="vacancyRate"
        {...register('vacancyRate', {
          required: '入居率は必須です',
          valueAsNumber: true,
        })}
        className={`select select-bordered w-full max-w-xs ${errors.vacancyRate ? 'select-error' : ''}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors.vacancyRate && (
        <p className="text-error text-xs mt-1">{errors.vacancyRate.message}</p>
      )}
    </div>
  );
};
