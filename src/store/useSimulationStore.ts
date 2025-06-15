'use client';

import { create } from 'zustand';
import { BuildingStructure, RC, SRC, Steel, Wood } from '@/domain/property/buildingStructure'; // BuildingStructureのサブクラスをインポート
import { Property } from '@/domain/property/property';
import { PropertyIncome } from '@/domain/propertyIncome/propertyIncome';
import { Loan } from '@/domain/propertyCost/loan';
import { LargeScaleRepairPlan } from '@/domain/propertyCost/largeScaleRepairPlan';
import { PropertyCost } from '@/domain/propertyCost/propertyCost';
import { PropertyBalanceSheet } from '@/domain/financial-plan/propertyBalanceSheet';

// 入力データの型定義
export type SimulationInput = {
  propertyPrice: number;
  surfaceYield: number;
  structure: string;
  constructionYear: number;
  buildingArea: number;
  selfFunds: number;
  interestRate: number;
  loanTerm: number;
  vacancyRate: number;
  rentIncreaseRate: number;
  managementFeeRatio: number;
  repairCostRatio: number;
  largeScaleRepairPlans: { repairYear: number; repairCost: number }[];
  landPrice: number;
  buildingPrice: number;
};

// 計算結果の型定義
export type SimulationResults = {
  annualBalances: { year: number; value: number }[]; // 年間収支（キャッシュフロー）
  grossYields: { year: number; value: number }[]; // 表面利回り
  realYields: { year: number; value: number }[]; // 実質利回り
  preTaxCashFlows: { year: number; value: number }[]; // 税引前キャッシュフロー
  taxableIncomes: { year: number; value: number }[]; // 課税所得
  totalPaymentAmount: number; // ローン総支払額
  initialAnnualIncome: number; // 初年度年間収入
};

export type SimulationStore = {
  input: SimulationInput;
  results: SimulationResults;
  errorMessage: string | null; // エラーメッセージを追加
  // アクション
  setInput: (data: Partial<SimulationInput>) => void;
  setResults: (data: Partial<SimulationResults>) => void;
  runSimulation: () => void; // シミュレーション実行アクション
  reset: () => void;
};

const initialInput: SimulationInput = {
  propertyPrice: 0,
  surfaceYield: 0,
  structure: 'RC', // 初期値はRCの文字列で固定
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
};

const initialResults: SimulationResults = {
  annualBalances: [],
  grossYields: [],
  realYields: [],
  preTaxCashFlows: [],
  taxableIncomes: [],
  totalPaymentAmount: 0,
  initialAnnualIncome: 0,
};

/**
 * シミュレーションに必要なドメインオブジェクトを生成し、PropertyBalanceSheetを返します。
 * @param {SimulationInput} input - シミュレーション入力データ
 * @returns {PropertyBalanceSheet} 生成されたPropertyBalanceSheetインスタンス
 */
export function createSimulationContext(input: SimulationInput): PropertyBalanceSheet {
  let buildingStructure: BuildingStructure;
  switch (input.structure) {
    case 'RC':
      buildingStructure = new RC();
      break;
    case 'SRC':
      buildingStructure = new SRC();
      break;
    case 'Steel':
      buildingStructure = new Steel();
      break;
    case 'Wood':
      buildingStructure = new Wood();
      break;
    default:
      throw new Error(`Unknown building structure: ${input.structure}`);
  }

  const property = new Property(
    input.landPrice,
    input.buildingPrice,
    buildingStructure, // stringからBuildingStructureインスタンスに変換
    input.constructionYear,
    input.buildingArea
  );

  const propertyIncome = new PropertyIncome(
    property,
    input.surfaceYield,
    input.rentIncreaseRate,
    input.vacancyRate
  );

  let loan: Loan | undefined;
  const loanAmount = input.propertyPrice - input.selfFunds;
  if (loanAmount > 0 && input.loanTerm > 0 && input.interestRate > 0) {
    loan = new Loan(loanAmount, input.interestRate, input.loanTerm);
  }

  const largeScaleRepairPlans = input.largeScaleRepairPlans.map(
    (plan) => new LargeScaleRepairPlan(plan.repairYear, plan.repairCost)
  );

  const propertyCost = new PropertyCost(
    propertyIncome,
    input.managementFeeRatio,
    input.repairCostRatio,
    largeScaleRepairPlans,
    loan
  );

  return new PropertyBalanceSheet(property, propertyIncome, propertyCost);
}

/**
 * PropertyBalanceSheetとシミュレーション期間に基づいて、各年のシミュレーション結果を計算します。
 * @param {PropertyBalanceSheet} balanceSheet - 計算に使用するPropertyBalanceSheetインスタンス
 * @param {number} simulationYears - シミュレーション期間（年）
 * @returns {Object} 各シミュレーション指標の年間データを含むオブジェクト
 */
export function calculateSimulationMetrics(
  balanceSheet: PropertyBalanceSheet,
  simulationYears: number
) {
  const annualBalances: { year: number; value: number }[] = [];
  const grossYields: { year: number; value: number }[] = [];
  const realYields: { year: number; value: number }[] = [];
  const preTaxCashFlows: { year: number; value: number }[] = [];
  const taxableIncomes: { year: number; value: number }[] = [];

  for (let year = 1; year <= simulationYears; year++) {
    annualBalances.push({ year, value: balanceSheet.calculateAnnualBalanceForYear(year) });
    grossYields.push({ year, value: balanceSheet.calculateGrossYieldForYear(year) });
    realYields.push({ year, value: balanceSheet.calculateRealYieldForYear(year) });
    preTaxCashFlows.push({ year, value: balanceSheet.calculatePreTaxCashFlowForYear(year) });
    taxableIncomes.push({ year, value: balanceSheet.calculateTaxableIncomeForYear(year) });
  }

  return { annualBalances, grossYields, realYields, preTaxCashFlows, taxableIncomes };
}

export const useSimulationStore = create<SimulationStore>((set, get) => ({
  input: initialInput,
  results: initialResults,
  errorMessage: null, // errorMessage の初期値を追加

  setInput: (newData) =>
    set((state) => ({
      input: {
        ...state.input,
        ...newData,
      },
    })),

  setResults: (newResults) =>
    set((state) => ({
      results: {
        ...state.results,
        ...newResults,
      },
    })),

  runSimulation: () => {
    try {
      const input = get().input;

      // ドメインオブジェクトの作成
      const balanceSheet = createSimulationContext(input);

      // 初年度年間収入を計算
      const initialAnnualIncome = balanceSheet.income.calculateAnnualIncome(1);

      // シミュレーション期間の定義 (例: 35年間、またはローン期間の最大値)
      const simulationYears = Math.max(input.loanTerm, 35); // 最低35年、またはローン期間

      // シミュレーション結果の計算
      const { annualBalances, grossYields, realYields, preTaxCashFlows, taxableIncomes } =
        calculateSimulationMetrics(balanceSheet, simulationYears);

      // ローン総支払額の計算
      const totalPaymentAmount = balanceSheet.cost.loan
        ? balanceSheet.cost.loan.calculateTotalPaymentAmount()
        : 0;

      // 計算結果をストアに保存
      set((state) => ({
        results: {
          ...state.results,
          annualBalances,
          grossYields,
          realYields,
          preTaxCashFlows,
          taxableIncomes,
          totalPaymentAmount,
          initialAnnualIncome,
        },
        errorMessage: null, // 成功時はエラーメッセージをクリア
      }));

      console.log('Simulation completed.');
    } catch (error) {
      console.error('Simulation failed:', error);
      set((state) => ({
        results: initialResults, // 結果を初期状態に戻す
        errorMessage: error instanceof Error ? error.message : '不明なエラーが発生しました。', // エラーメッセージをセット
      }));
    }
  },

  reset: () => ({
    input: initialInput,
    results: initialResults,
  }),
}));
