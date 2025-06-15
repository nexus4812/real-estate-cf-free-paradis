'use client';

import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { useSimulationStore, SimulationInput } from '@/store/useSimulationStore';

/**
 * @typedef {Object} ReturnRateInputProps
 * @property {UseFormRegister<SimulationInput>} register - React Hook Form の register 関数
 * @property {FieldErrors<SimulationInput>} errors - React Hook Form の errors オブジェクト
 */
interface ReturnRateInputProps {
  register: UseFormRegister<SimulationInput>;
  errors: FieldErrors<SimulationInput>;
}

/**
 * 表面利回り入力コンポーネント
 * @param {ReturnRateInputProps} props - プロパティ
 * @returns {JSX.Element}
 */
export const ReturnRateInput = ({ register, errors }: ReturnRateInputProps) => {
  const { setInput } = useSimulationStore();

  return (
    <div className="mb-2">
      <label htmlFor="surfaceYield" className="input-label flex items-center text-xs mb-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3 mr-1 text-blue-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
            clipRule="evenodd"
          />
        </svg>
        表面利回り:
      </label>

      <div className="input-group">
        <input
          id="surfaceYield"
          type="number"
          {...register('surfaceYield', {
            required: '表面利回りは必須です',
            min: {
              value: 0,
              message: '0以上の値を入力してください',
            },
            valueAsNumber: true,
          })}
          className={`input-field py-2 px-3 text-sm ${errors.surfaceYield ? 'border-red-500' : ''}`}
          placeholder="表面利回りを入力"
        />
        <span className="input-addon text-xs">%</span>
      </div>

      {errors.surfaceYield && (
        <p className="text-red-500 text-xs mt-1">{errors.surfaceYield.message}</p>
      )}
    </div>
  );
};
