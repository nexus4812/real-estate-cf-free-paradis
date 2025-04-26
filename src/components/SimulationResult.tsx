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
    
    // 入力値がない場合は0を返す
    if (!propertyPrice || !interestRate || !loanTerm) return 0;
    
    const loanAmount = propertyPrice - selfFunds; // ローン金額 = 物件価格 - 自己資金
    
    // 月利計算 (年利 ÷ 12)
    const monthlyInterestRate = interestRate / 100 / 12;
    
    // 月々の返済額計算 (元利均等返済方式)
    const totalPayments = loanTerm * 12; // 返済回数
    const monthlyPayment = loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments) / (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);
    
    return isNaN(monthlyPayment) ? 0 : Math.round(monthlyPayment);
  };

  // 年間の収支計算
  const calculateAnnualBalance = () => {
    const { annualIncome, annualCost } = data;
    const monthlyPayment = calculateSimulation();
    const annualPayment = monthlyPayment * 12;
    return (annualIncome || 0) - (annualCost || 0) - annualPayment;
  };

  // 表示用にフォーマットする関数
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP').format(amount);
  };

  const monthlyPayment = calculateSimulation();
  const annualBalance = calculateAnnualBalance();

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
            <p className="font-medium">{formatCurrency(monthlyPayment * 12)} 円</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">返済総額</p>
            <p className="font-medium">{formatCurrency(monthlyPayment * (data.loanTerm || 0) * 12)} 円</p>
          </div>
        </div>
      </div>
    </div>
  );
};
