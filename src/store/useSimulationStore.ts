'use client';

import { create } from 'zustand';
import {
  SimulationInput,
  SimulationResults,
  runSimulationService,
} from '@/domain/simulation/simulationService';

export type SimulationStore = {
  input: SimulationInput;
  results: SimulationResults | null; // resultsをnull許容にする
  loading: boolean; // loading状態を追加
  error: string | null; // errorMessageをerrorにリネーム
  setInput: (data: Partial<SimulationInput>) => void;
  setResults: (data: Partial<SimulationResults>) => void;
  runSimulation: () => void;
  reset: () => void;
};

const initialInput: SimulationInput = {
  propertyPrice: 0,
  surfaceYield: 0,
  structure: 'RC',
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
  finalAssetValue: 0,
  metrics: {
    initialInvestment: 0,
    totalIncome: 0,
    totalExpense: 0,
    netProfit: 0,
    cashFlow: 0,
    yield: 0,
    roi: 0,
    irr: 0,
    npv: 0,
  },
};

export const useSimulationStore = create<SimulationStore>((set, get) => ({
  input: initialInput,
  results: null, // 初期値をnullにする
  loading: false, // 初期値をfalseにする
  error: null,

  setInput: (newData) =>
    set((state) => ({
      input: {
        ...state.input,
        ...newData,
      },
    })),

  setResults: (newResults) =>
    set((state) => ({
      results: state.results ? { ...state.results, ...newResults } : (newResults as SimulationResults),
    })),

  runSimulation: () => {
    set({ loading: true, error: null }); // シミュレーション開始時にloadingをtrue、errorをnullに設定
    try {
      const input = get().input;
      const simulationResults = runSimulationService(input);

      set({
        results: simulationResults,
        loading: false,
        error: null,
      });
    } catch (error) {
      set({
        results: null, // エラー時はresultsをnullにする
        loading: false,
        error: error instanceof Error ? error.message : '不明なエラーが発生しました。',
      });
    }
  },

  reset: () => ({
    input: initialInput,
    results: null, // reset時もresultsをnullにする
    loading: false,
    error: null,
  }),
}));
