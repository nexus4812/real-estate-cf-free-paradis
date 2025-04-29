"use client";

import { useSimulationStore } from "@/store/usePropertyStore";

/**
 * シミュレーション結果を表示するコンポーネント
 */
export const SimulationResult = () => {
  const { simulation } = useSimulationStore();

  // 月々のローン返済額を計算
  const calculateMonthlyPayment = () => {
    return simulation.calculateMonthlyLoanPayment();
  };

  // 年間の収支計算（初年度）
  const calculateAnnualBalance = () => {
    return simulation.calculateAnnualBalance(0);
  };

  // 実質年間収入を計算（初年度）
  const calculateRealAnnualIncome = () => {
    return simulation.calculateRealAnnualIncome(0);
  };

  // 年間支出を計算（初年度）
  const calculateAnnualExpenditure = () => {
    return simulation.calculateAnnualExpenditure(0);
  };

  // 所得税を計算（初年度）
  const calculateIncomeTax = () => {
    return simulation.calculateIncomeTax(0);
  };

  // 大規模修繕費を計算（初年度）
  const calculateMajorRepairCost = () => {
    return simulation.calculateMajorRepairCost(0);
  };

  // 表示用にフォーマットする関数
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP').format(amount);
  };

  const monthlyPayment = calculateMonthlyPayment();
  const annualBalance = calculateAnnualBalance();
  const realAnnualIncome = calculateRealAnnualIncome();
  const annualExpenditure = calculateAnnualExpenditure();
  const incomeTax = calculateIncomeTax();
  const majorRepairCost = calculateMajorRepairCost();
  const annualLoanPayment = simulation.calculateAnnualLoanPayment();

  return (
    <div className="p-4">
      <h3 className="text-2xl font-bold mb-6 text-center text-gray-800 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1zm1-4a1 1 0 100 2h.01a1 1 0 100-2H7zm2 1a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm4-4a1 1 0 100 2h.01a1 1 0 100-2H13zM9 9a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zM7 8a1 1 0 000 2h.01a1 1 0 000-2H7z" clipRule="evenodd" />
        </svg>
        シミュレーション結果
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
          <h4 className="text-lg font-semibold mb-2 text-gray-700">月々の返済額</h4>
          <p className="text-3xl font-bold text-blue-600">{formatCurrency(monthlyPayment)} <span className="text-sm text-gray-500">円/月</span></p>
        </div>

        <div className={`bg-white p-4 rounded-lg shadow-md border-l-4 ${annualBalance >= 0 ? 'border-green-500' : 'border-red-500'}`}>
          <h4 className="text-lg font-semibold mb-2 text-gray-700">年間収支</h4>
          <p className={`text-3xl font-bold ${annualBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {formatCurrency(Math.abs(annualBalance))} <span className="text-sm text-gray-500">円/年 {annualBalance >= 0 ? '(黒字)' : '(赤字)'}</span>
          </p>
        </div>
      </div>

      <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h4 className="text-md font-semibold mb-2 text-gray-700">詳細情報</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">年間返済額</p>
            <p className="font-medium">{formatCurrency(annualLoanPayment)} 円</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">返済総額</p>
            <p className="font-medium">{formatCurrency(annualLoanPayment * (simulation.props.loanTerm || 0))} 円</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">実質年間収入（初年度）</p>
            <p className="font-medium">{formatCurrency(realAnnualIncome)} 円</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">年間支出（初年度）</p>
            <p className="font-medium">{formatCurrency(annualExpenditure)} 円</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">所得税（初年度）</p>
            <p className="font-medium">{formatCurrency(incomeTax)} 円</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">大規模修繕費（初年度）</p>
            <p className="font-medium">{formatCurrency(majorRepairCost)} 円</p>
          </div>
        </div>
      </div>
    </div>
  );
};
