'use client';

import { create } from 'zustand';
import { BuildingStructure, RC } from '@/domain/property/buildingStructure';

// 入力データの型定義
export type SimulationInput = {
    propertyPrice: number;
    surfaceYield: number;
    structure: BuildingStructure;
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
    // その他の計算結果も必要に応じて追加
};

export type SimulationStore = {
    input: SimulationInput;
    results: SimulationResults;
    // アクション
    setInput: (data: Partial<SimulationInput>) => void;
    setResults: (data: Partial<SimulationResults>) => void;
    runSimulation: () => void; // シミュレーション実行アクション
    reset: () => void;
};

const initialInput: SimulationInput = {
    propertyPrice: 0,
    surfaceYield: 0,
    structure: new RC(), // 初期値はRCで固定
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
};

export const useSimulationStore = create<SimulationStore>((set, get) => ({
    input: initialInput,
    results: initialResults,

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
        // ここにドメインモデルを呼び出すロジックを実装
        // get().input を使って入力値を取得し、ドメインモデルのクラスをインスタンス化して計算を実行
        // 計算結果を setResults でストアに保存
        console.log("Running simulation with input:", get().input);
        // TODO: ドメインモデルの呼び出しと結果の保存を実装
    },

    reset: () => ({
        input: initialInput,
        results: initialResults,
    }),
}));
