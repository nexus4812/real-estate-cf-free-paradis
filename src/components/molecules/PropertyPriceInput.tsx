'use client';

import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { useSimulationStore, SimulationInput } from '@/store/usePropertyStore';

/**
 * @typedef {Object} PropertyPriceInputProps
 * @property {UseFormRegister<SimulationInput>} register - React Hook Form の register 関数
 * @property {FieldErrors<SimulationInput>} errors - React Hook Form の errors オブジェクト
 */
interface PropertyPriceInputProps {
  register: UseFormRegister<SimulationInput>;
  errors: FieldErrors<SimulationInput>;
}

/**
 * 物件価格入力コンポーネント
 * @param {PropertyPriceInputProps} props - プロパティ
 * @returns {JSX.Element}
 */
export default function PropertyPriceInput({ register, errors }: PropertyPriceInputProps) {
  const { setInput } = useSimulationStore();

  return (
    <div className="mb-2">
      <label htmlFor="propertyPrice" className="input-label flex items-center text-xs mb-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3 mr-1 text-blue-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
            clipRule="evenodd"
          />
        </svg>
        物件価格:
      </label>
      <div className="input-group">
        <input
          id="propertyPrice"
          type="number"
          {...register('propertyPrice', {
            required: '物件価格は必須です',
            min: { value: 0, message: '0以上の値を入力してください' },
            valueAsNumber: true,
          })}
          className="input-field py-2 px-3 text-sm"
          placeholder="物件価格を入力"
        />
        <span className="input-addon text-xs">円</span>
      </div>
      {errors.propertyPrice && (
        <p className="text-red-500 text-xs mt-1">{errors.propertyPrice.message}</p>
      )}
    </div>
  );
}
