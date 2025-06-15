'use client';

import { create } from 'zustand';
import { SimulationInput, SimulationResults, runSimulationService } from '@/domain/simulation/simulationService';

export type SimulationStore = {
  input: SimulationInput;
  results: SimulationResults;
  errorMessage: string | null;
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
};

export const useSimulationStore = create<SimulationStore>((set, get) => ({
  input: initialInput,
  results: initialResults,
  errorMessage: null,

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
      const simulationResults = runSimulationService(input);

      set((state) => ({
        results: {
          ...state.results,
          ...simulationResults,
        },
        errorMessage: null,
      }));
    } catch (error) {
      set((state) => ({
        results: initialResults,
        errorMessage: error instanceof Error ? error.message : null,
      }));
    }
  },

  reset: () => ({
    input: initialInput,
    results: initialResults,
  }),
}));
