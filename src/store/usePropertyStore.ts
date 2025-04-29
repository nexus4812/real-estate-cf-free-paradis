'use client';

import { SimulationEntity, SimulationProps } from '@/domain/entities/simulationEntity';
import { Structure } from '@/domain/values/structure';
import { create } from 'zustand';

export type SimulationStore = {
    simulation: SimulationEntity;
    update: (updater: (simulation: SimulationEntity) => void) => void;
    setData: (data: Partial<SimulationProps>) => void;
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
    rentIncreaseRate: 0,
    annualCost: 0,
};

export const useSimulationStore = create<SimulationStore>((set, get) => ({
    simulation: new SimulationEntity(initialData),

    update: (updater) =>
        set((state) => {
            updater(state.simulation);
            return { simulation: state.simulation };
        }),

    setData: (newData) =>
        set((state) => {
            const updatedProps = {
                ...state.simulation.props,
                ...newData
            };
            return { simulation: new SimulationEntity(updatedProps) };
        }),

    reset: () => new SimulationEntity(initialData),
}));
