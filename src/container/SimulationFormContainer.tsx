import React from 'react';
import { useForm } from 'react-hook-form';
import { SimulationInput } from '@/domain/simulation/simulationService';
import { useSimulationStore } from '@/store/useSimulationStore';
import { PropertyInformationForm } from '@/components/organism/PropertyInformationForm';
import { LoanConditionForm } from '@/components/organism/LoanConditionForm';
import { IncomeConditionForm } from '@/components/organism/IncomeConditionForm';
import { CostConditionForm } from '@/components/organism/CostConditionForm';
import { Button } from '@/components/atoms/Button';

export type SimulationFormContainerProps = {
  children?: React.ReactNode;
};

/**
 * シミュレーションフォームのContainer
 * フォーム状態管理とZustand連携を担当
 */
export const SimulationFormContainer: React.FC<SimulationFormContainerProps> = () => {
  const { input, setInput, runSimulation } = useSimulationStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<SimulationInput>({
    defaultValues: input,
  });

  // フォーム値の変更をZustandに同期
  const watchedValues = watch();
  React.useEffect(() => {
    setInput(watchedValues);
  }, [watchedValues, setInput]);

  const onSubmit = (data: SimulationInput) => {
    setInput(data);
    runSimulation();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" role="form">
      <PropertyInformationForm
        propertyPrice={input.propertyPrice}
        surfaceYield={input.surfaceYield}
        structure={input.structure}
        constructionYear={input.constructionYear}
        buildingArea={input.buildingArea}
        onPropertyPriceChange={(value) => setValue('propertyPrice', value)}
        onSurfaceYieldChange={(value) => setValue('surfaceYield', value)}
        onStructureChange={(value) => setValue('structure', value)}
        onConstructionYearChange={(value) => setValue('constructionYear', value)}
        onBuildingAreaChange={(value) => setValue('buildingArea', value)}
        errors={{
          propertyPrice: errors.propertyPrice?.message,
          surfaceYield: errors.surfaceYield?.message,
          structure: errors.structure?.message,
          constructionYear: errors.constructionYear?.message,
          buildingArea: errors.buildingArea?.message,
        }}
      />

      <LoanConditionForm
        selfFunds={input.selfFunds}
        interestRate={input.interestRate}
        loanTerm={input.loanTerm}
        onSelfFundsChange={(value) => setValue('selfFunds', value)}
        onInterestRateChange={(value) => setValue('interestRate', value)}
        onLoanTermChange={(value) => setValue('loanTerm', value)}
        errors={{
          selfFunds: errors.selfFunds?.message,
          interestRate: errors.interestRate?.message,
          loanTerm: errors.loanTerm?.message,
        }}
      />

      <IncomeConditionForm
        vacancyRate={input.vacancyRate}
        rentIncreaseRate={input.rentIncreaseRate}
        onVacancyRateChange={(value) => setValue('vacancyRate', value)}
        onRentIncreaseRateChange={(value) => setValue('rentIncreaseRate', value)}
        errors={{
          vacancyRate: errors.vacancyRate?.message,
          rentIncreaseRate: errors.rentIncreaseRate?.message,
        }}
      />

      <CostConditionForm
        managementFeeRatio={input.managementFeeRatio}
        repairCostRatio={input.repairCostRatio}
        onManagementFeeRatioChange={(value) => setValue('managementFeeRatio', value)}
        onRepairCostRatioChange={(value) => setValue('repairCostRatio', value)}
        errors={{
          managementFeeRatio: errors.managementFeeRatio?.message,
          repairCostRatio: errors.repairCostRatio?.message,
        }}
      />

      <div className="flex justify-center space-x-4">
        <Button type="submit" variant="primary">
          シミュレーション実行
        </Button>
      </div>
    </form>
  );
};
