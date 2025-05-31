"use client";

import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { SimulationInput } from '@/store/usePropertyStore';

/**
 * @typedef {Object} RentIncreaseRateInputProps
 * @property {UseFormRegister<SimulationInput>} register - React Hook Form の register 関数
 * @property {FieldErrors<SimulationInput>} errors - React Hook Form の errors オブジェクト
 */
interface RentIncreaseRateInputProps {
  register: UseFormRegister<SimulationInput>;
  errors: FieldErrors<SimulationInput>;
}

/**
 * 家賃増減率の入力コンポーネントです。
 * @param {RentIncreaseRateInputProps} props - コンポーネントのプロパティ
 */
export const RentIncreaseRateInput = ({ register, errors }: RentIncreaseRateInputProps) => {
  const options = [
    { value: -0.05, label: '-5%' },
    { value: -0.045, label: '-4.5%' },
    { value: -0.04, label: '-4%' },
    { value: -0.035, label: '-3.5%' },
    { value: -0.03, label: '-3%' },
    { value: -0.025, label: '-2.5%' },
    { value: -0.02, label: '-2%' },
    { value: -0.015, label: '-1.5%' },
    { value: -0.01, label: '-1%' },
    { value: -0.005, label: '-0.5%' },
    { value: 0, label: '0%' },
    { value: 0.005, label: '0.5%' },
    { value: 0.01, label: '1%' },
    { value: 0.015, label: '1.5%' },
    { value: 0.02, label: '2%' },
  ];

  return (
    <div className="form-control w-full max-w-xs">
      <label htmlFor="rentIncreaseRate" className="label">
        <span className="label-text">家賃増減率 (%/年)</span>
      </label>
      <select
        id="rentIncreaseRate"
        {...register('rentIncreaseRate', {
          required: '家賃増減率は必須です',
          valueAsNumber: true,
        })}
        className={`select select-bordered w-full max-w-xs ${errors.rentIncreaseRate ? 'select-error' : ''}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors.rentIncreaseRate && (
        <p className="text-error text-xs mt-1">{errors.rentIncreaseRate.message}</p>
      )}
    </div>
  );
};
