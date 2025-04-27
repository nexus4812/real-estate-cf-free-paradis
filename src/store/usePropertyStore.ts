'use client';

import { create } from 'zustand';

export type SimulationData = {
    propertyPrice: number|null;
    returnRate: number;
    structure: string;
    age: number;
    area: number;
    selfFunds: number;
    interestRate: number;
    loanTerm: number;
    occupancyRate: number;
    annualIncome: number;
    rentIncreaseRate: string;
    annualCost: number;
};

type SimulationStore = {
    data: SimulationData;
    setData: (data: Partial<SimulationData>) => void;
    reset: () => void;
};

const initialData: SimulationData = {
    propertyPrice: null,
    returnRate: 0,
    structure: '',
    age: 0,
    area: 0,
    selfFunds: 0,
    interestRate: 0,
    loanTerm: 0,
    occupancyRate: 0,
    annualIncome: 0,
    rentIncreaseRate: '',
    annualCost: 0,
};

export const useSimulationStore = create<SimulationStore>((set) => ({
    data: initialData,
    setData: (newData) =>
        set((state) => ({
            data: { ...state.data, ...newData },
        })),
    reset: () => set({ data: initialData }),
}));
