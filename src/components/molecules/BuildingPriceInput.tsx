'use client';

import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { SimulationInput } from '@/store/useSimulationStore';

/**
 * @typedef {Object} BuildingPriceInputProps
 * @property {UseFormRegister<SimulationInput>} register - React Hook Form の register 関数
 * @property {FieldErrors<SimulationInput>} errors - React Hook Form の errors オブジェクト
 */
interface BuildingPriceInputProps {
  register: UseFormRegister<SimulationInput>;
  errors: FieldErrors<SimulationInput>;
}

/**
 * 建物価格を入力するコンポーネントです。
 * @param {BuildingPriceInputProps} props - コンポーネントのプロパティ
 */
export const BuildingPriceInput = ({ register, errors }: BuildingPriceInputProps) => {
  return (
    <div>
      <label htmlFor="buildingPrice" className="block text-sm font-medium text-gray-700 mb-1">
        建物価格 (円)
      </label>
      <input
        type="number"
        id="buildingPrice"
        {...register('buildingPrice', {
          valueAsNumber: true,
          required: '建物価格は必須です',
          min: { value: 0, message: '0以上の値を入力してください' },
        })}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        placeholder="例: 20000000"
      />
      {errors.buildingPrice && (
        <p className="mt-2 text-sm text-red-600">{errors.buildingPrice.message}</p>
      )}
    </div>
  );
};
