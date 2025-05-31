'use client';

import { create } from 'zustand';
import { BuildingStructure, RC } from '@/domain/property/buildingStructure';
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
    initialAnnualIncome: number; // 初年度年間収入
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
    initialAnnualIncome: 0,
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
        try {
            const input = get().input;

            // 1. Property インスタンスの作成
            const property = new Property(
                input.landPrice,
                input.buildingPrice,
                input.structure,
                input.constructionYear,
                input.buildingArea
            );

            // 2. PropertyIncome インスタンスの作成
            const propertyIncome = new PropertyIncome(
                property,
                input.surfaceYield,
                input.rentIncreaseRate,
                input.vacancyRate
            );

            // 初年度年間収入を計算
            const initialAnnualIncome = propertyIncome.calculateAnnualIncome(1);

            // 3. Loan インスタンスの作成 (自己資金が物件価格未満の場合のみ)
            let loan: Loan | undefined;
            const loanAmount = input.propertyPrice - input.selfFunds;
            if (loanAmount > 0 && input.loanTerm > 0 && input.interestRate > 0) {
                loan = new Loan(loanAmount, input.interestRate, input.loanTerm);
            }

            // 4. LargeScaleRepairPlan インスタンスの配列作成
            const largeScaleRepairPlans = input.largeScaleRepairPlans.map(
                (plan) => new LargeScaleRepairPlan(plan.repairYear, plan.repairCost)
            );

            // 5. PropertyCost インスタンスの作成
            const propertyCost = new PropertyCost(
                propertyIncome,
                input.managementFeeRatio,
                input.repairCostRatio,
                largeScaleRepairPlans,
                loan
            );

            // 6. PropertyBalanceSheet インスタンスの作成
            const balanceSheet = new PropertyBalanceSheet(
                property,
                propertyIncome,
                propertyCost
            );

            // 7. シミュレーション期間の定義 (例: 35年間、またはローン期間の最大値)
            const simulationYears = Math.max(input.loanTerm, 35); // 最低35年、またはローン期間

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

            // 8. 計算結果をストアに保存
            set((state) => ({
                results: {
                    ...state.results,
                    annualBalances,
                    grossYields,
                    realYields,
                    preTaxCashFlows,
                    taxableIncomes,
                    totalPaymentAmount: loan ? loan.calculateTotalPaymentAmount() : 0,
                    initialAnnualIncome: initialAnnualIncome, // 初年度年間収入を追加
                },
            }));

            console.log("Simulation completed.");
        } catch (error) {
            console.error("Simulation failed:", error);
            set((state) => ({
                results: initialResults, // 結果を初期状態に戻す
            }));
        }
    },

    reset: () => ({
        input: initialInput,
        results: initialResults,
    }),
}));
