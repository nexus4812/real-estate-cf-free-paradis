'use client';

import { SimulationEntity, SimulationProps } from '@/domain/entities/simulationEntity';
import { Structure } from '@/domain/values/structure';
import { create } from 'zustand';

export type SimulationStore = {
    data: SimulationEntity;
    update: (updater: (simulation: SimulationEntity) => void) => void;
    reset: () => void;
};

const initialData: SimulationProps = {
    propertyPrice: 0,
    returnRate: 0,
    structure: Structure.create("RC"),
    age: 0,
    area: 0,
    selfFunds: 0,
    interestRate: 0,
    loanTerm: 0,
    occupancyRate: 0,
    rentIncreaseRate: '',
    annualCost: 0,
};

export const useSimulationStore = create<SimulationStore>((set, get) => ({
    data: new SimulationEntity(initialData),

    update: (updater) =>
        set((state) => {
            updater(state.data);
            return { data: state.data };
        }),

    reset: () => new SimulationEntity(initialData),
}));
