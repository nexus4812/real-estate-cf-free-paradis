'use client';

import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { SimulationInput } from '@/store/usePropertyStore';

/**
 * @typedef {Object} LandPriceInputProps
 * @property {UseFormRegister<SimulationInput>} register - React Hook Form の register 関数
 * @property {FieldErrors<SimulationInput>} errors - React Hook Form の errors オブジェクト
 */
interface LandPriceInputProps {
  register: UseFormRegister<SimulationInput>;
  errors: FieldErrors<SimulationInput>;
}

/**
 * 土地価格を入力するコンポーネントです。
 * @param {LandPriceInputProps} props - コンポーネントのプロパティ
 */
export const LandPriceInput = ({ register, errors }: LandPriceInputProps) => {
  return (
    <div>
      <label htmlFor="landPrice" className="block text-sm font-medium text-gray-700 mb-1">
        土地価格 (円)
      </label>
      <input
        type="number"
        id="landPrice"
        {...register('landPrice', {
          valueAsNumber: true,
          required: '土地価格は必須です',
          min: { value: 0, message: '0以上の値を入力してください' },
        })}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        placeholder="例: 10000000"
      />
      {errors.landPrice && <p className="mt-2 text-sm text-red-600">{errors.landPrice.message}</p>}
    </div>
  );
};
