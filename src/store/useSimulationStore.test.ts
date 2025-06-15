import { act } from 'react';
import { useSimulationStore } from './useSimulationStore';
import {
  SimulationInput,
  SimulationResults,
  runSimulationService,
} from '@/domain/simulation/simulationService';
import { RC } from '@/domain/property/buildingStructure';

describe('useSimulationStore', () => {
  beforeEach(() => {
    // 各テストの前にストアをリセット
    act(() => {
      useSimulationStore.getState().reset();
    });
  });

  it('初期状態が正しいこと', () => {
    const { input, results } = useSimulationStore.getState();

    expect(input).toEqual({
      propertyPrice: 0,
      surfaceYield: 0,
      structure: 'RC', // stringに変更
      constructionYear: 0,
      buildingArea: 0,
      selfFunds: 0,
      interestRate: 0,
      loanTerm: 0,
      vacancyRate: 0,
      rentIncreaseRate: 0,
      managementFeeRatio: 0,
      repairCostRatio: 0,
      largeScaleRepairPlans: [],
      landPrice: 0,
      buildingPrice: 0,
    });

    expect(results).toEqual({
      annualBalances: [],
      grossYields: [],
      realYields: [],
      preTaxCashFlows: [],
      taxableIncomes: [],
      totalPaymentAmount: 0,
      initialAnnualIncome: 0, // 追加
    });
  });

  it('setInput アクションで入力データが正しく更新されること', () => {
    const { setInput } = useSimulationStore.getState();

    const newData: Partial<SimulationInput> = {
      propertyPrice: 50000000,
      surfaceYield: 0.05,
      landPrice: 20000000,
      buildingPrice: 30000000,
    };

    act(() => {
      setInput(newData);
    });

    const { input } = useSimulationStore.getState();
    expect(input.propertyPrice).toBe(50000000);
    expect(input.surfaceYield).toBe(0.05);
    expect(input.landPrice).toBe(20000000);
    expect(input.buildingPrice).toBe(30000000);
    expect(input.structure).toEqual('RC'); // 変更されていないプロパティはそのまま
  });

  it('runSimulation アクションが実行され、results が正しく計算・更新されること', () => {
    const { setInput, runSimulation } = useSimulationStore.getState();

    // シミュレーションに必要な最小限の入力データを設定
    const inputData: SimulationInput = {
      propertyPrice: 50000000,
      surfaceYield: 0.05,
      structure: 'RC', // stringに変更
      constructionYear: 10,
      buildingArea: 100,
      selfFunds: 10000000, // 自己資金
      interestRate: 0.01, // 金利1%
      loanTerm: 30, // 借入期間30年
      vacancyRate: 0.1, // 空室率10%
      rentIncreaseRate: 0.01, // 家賃増減率1%
      managementFeeRatio: 0.05, // 管理費率5%
      repairCostRatio: 0.03, // 修繕費率3%
      largeScaleRepairPlans: [{ repairYear: 10, repairCost: 1000000 }],
      landPrice: 20000000,
      buildingPrice: 30000000,
    };

    act(() => {
      setInput(inputData);
      runSimulation();
    });

    const { results } = useSimulationStore.getState();

    // 計算結果が空でないことを確認 (具体的な値はドメインモデルの計算結果に依存するため、ここでは存在チェックのみ)
    expect(results.annualBalances.length).toBeGreaterThan(0);
    expect(results.grossYields.length).toBeGreaterThan(0);
    expect(results.realYields.length).toBeGreaterThan(0);
    expect(results.preTaxCashFlows.length).toBeGreaterThan(0);
    expect(results.taxableIncomes.length).toBeGreaterThan(0);
    expect(results.totalPaymentAmount).toBeGreaterThan(0);

    // 例: 初年度の年間収支が計算されていることを確認
    const firstYearBalance = results.annualBalances.find((b) => b.year === 1)?.value;
    expect(firstYearBalance).toBeDefined();
    // ここに具体的な期待値を記述することも可能だが、ドメインモデルのテストでカバーされるべき
  });
});
