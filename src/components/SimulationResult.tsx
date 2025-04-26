"use client";

import { useSimulationStore } from "@/store/usePropertyStore";

/**
 * シミュレーション結果を表示するコンポーネント
 */
export const SimulationResult = () => {
  const { data } = useSimulationStore();

  // シミュレーション結果を計算する関数
  const calculateSimulation = () => {
    const { propertyPrice, returnRate, selfFunds, interestRate, loanTerm, annualIncome, annualCost } = data;
    const loanAmount = propertyPrice + annualIncome - selfFunds; // 簡略化した計算式
    const monthlyPayment = loanAmount * (interestRate / 100) / 12 * loanTerm; // 簡略化したローン計算式
    return monthlyPayment;
  };

  return (
    <div>
      <h3>シミュレーション結果</h3>
      <p>月々の返済額: {calculateSimulation()} 円</p>
    </div>
  );
};
