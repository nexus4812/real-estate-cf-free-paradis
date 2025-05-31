import { useForm, SubmitHandler, UseFormRegister, FieldErrors } from 'react-hook-form';
import { SimulationInput, useSimulationStore } from '@/store/usePropertyStore';
import PropertyPriceInput from '@/components/molecules/PropertyPriceInput';
import { ReturnRateInput } from '@/components/molecules/ReturnRateInput';
import { StructureInput } from '@/components/molecules/StructureInput';
import { AgeInput } from '@/components/molecules/AgeInput';
import { AreaInput } from '@/components/molecules/AreaInput';
import { SelfFundsInput } from '@/components/molecules/SelfFundsInput';
import { InterestRateInput } from '@/components/molecules/InterestRateInput';
import { LoanTermInput } from '@/components/molecules/LoanTermInput';
import { OccupancyRateInput } from '@/components/molecules/OccupancyRateInput';
import { RentIncreaseRateInput } from '@/components/molecules/RentIncreaseRateInput';
import { ManagementFeeRatioInput } from '@/components/molecules/ManagementFeeRatioInput';
import { RepairCostRatioInput } from '@/components/molecules/RepairCostRatioInput';
import { LandPriceInput } from '@/components/molecules/LandPriceInput';
import { BuildingPriceInput } from '@/components/molecules/BuildingPriceInput';

/**
 * @typedef {Object} PropertyInformationProps
 * @property {UseFormRegister<SimulationInput>} register - React Hook Form の register 関数
 * @property {FieldErrors<SimulationInput>} errors - React Hook Form の errors オブジェクト
 */
interface PropertyInformationProps {
  register: UseFormRegister<SimulationInput>;
  errors: FieldErrors<SimulationInput>;
}

/**
 * 物件情報を入力するオーガニズムコンポーネントです。
 * React Hook Form の register と errors を props として受け取り、子コンポーネントに渡します。
 * @param {PropertyInformationProps} props - コンポーネントのプロパティ
 */
export const PropertyInformation = ({ register, errors }: PropertyInformationProps) => {
  return (
    <div className="card p-4 mb-8 animate-fade-in">
      <h3 className="section-title flex items-center text-lg mb-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-1.5 text-blue-600"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
        物件情報
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <PropertyPriceInput register={register} errors={errors} />
        <ReturnRateInput register={register} errors={errors} />
        <StructureInput register={register} errors={errors} />
        <AgeInput register={register} errors={errors} />
        <AreaInput register={register} errors={errors} />
        <SelfFundsInput register={register} errors={errors} />
        <InterestRateInput register={register} errors={errors} />
        <LoanTermInput register={register} errors={errors} />
        <OccupancyRateInput register={register} errors={errors} />
        <RentIncreaseRateInput register={register} errors={errors} />
        <ManagementFeeRatioInput register={register} errors={errors} />
        <RepairCostRatioInput register={register} errors={errors} />
        <LandPriceInput register={register} errors={errors} />
        <BuildingPriceInput register={register} errors={errors} />
      </div>
    </div>
  );
};
