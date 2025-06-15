'use client';

import { useSimulationStore } from '@/store/useSimulationStore';

/**
 * シミュレーション結果を表示するコンポーネント
 */
export const SimulationResult = () => {
  const { input, results } = useSimulationStore();

  /**
   * 月々のローン返済額を計算します。
   * @returns {number} 月々のローン返済額
   */
  const calculateMonthlyPayment = (): number => {
    if (input.loanTerm === 0) return 0;
    return results.totalPaymentAmount / (input.loanTerm * 12);
  };

  /**
   * 年間の収支（キャッシュフロー）を計算します。
   * @returns {number} 初年度の年間収支
   */
  const getAnnualBalance = (): number => {
    return results.annualBalances[0]?.value || 0;
  };

  /**
   * 税引前キャッシュフローを計算します。
   * @returns {number} 初年度の税引前キャッシュフロー
   */
  const getPreTaxCashFlow = (): number => {
    return results.preTaxCashFlows[0]?.value || 0;
  };

  /**
   * 課税所得を計算します。
   * @returns {number} 初年度の課税所得
   */
  const getTaxableIncome = (): number => {
    return results.taxableIncomes[0]?.value || 0;
  };

  /**
   * 表示用に数値をフォーマットします。
   * @param {number} amount - フォーマットする金額
   * @returns {string} フォーマットされた文字列
   */
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('ja-JP').format(amount);
  };

  const monthlyPayment = calculateMonthlyPayment();
  const annualBalance = getAnnualBalance();
  const preTaxCashFlow = getPreTaxCashFlow();
  const taxableIncome = getTaxableIncome();
  const annualLoanPayment = input.loanTerm > 0 ? results.totalPaymentAmount / input.loanTerm : 0;

  return (
    <div className="p-4">
      <h3 className="text-2xl font-bold mb-6 text-center text-gray-800 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2 text-blue-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1zm1-4a1 1 0 100 2h.01a1 1 0 100-2H7zm2 1a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm4-4a1 1 0 100 2h.01a1 1 0 100-2H13zM9 9a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zM7 8a1 1 0 000 2h.01a1 1 0 000-2H7z"
            clipRule="evenodd"
          />
        </svg>
        シミュレーション結果
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
          <h4 className="text-lg font-semibold mb-2 text-gray-700">月々の返済額</h4>
          <p className="text-3xl font-bold text-blue-600">
            {formatCurrency(monthlyPayment)} <span className="text-sm text-gray-500">円/月</span>
          </p>
        </div>

        <div
          className={`bg-white p-4 rounded-lg shadow-md border-l-4 ${annualBalance >= 0 ? 'border-green-500' : 'border-red-500'}`}
        >
          <h4 className="text-lg font-semibold mb-2 text-gray-700">年間収支</h4>
          <p
            className={`text-3xl font-bold ${annualBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}
          >
            {formatCurrency(Math.abs(annualBalance))}{' '}
            <span className="text-sm text-gray-500">
              円/年 {annualBalance >= 0 ? '(黒字)' : '(赤字)'}
            </span>
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
            <p className="font-medium">{formatCurrency(results.totalPaymentAmount)} 円</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">税引前キャッシュフロー（初年度）</p>
            <p className="font-medium">{formatCurrency(preTaxCashFlow)} 円</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">課税所得（初年度）</p>
            <p className="font-medium">{formatCurrency(taxableIncome)} 円</p>
          </div>
        </div>
      </div>
    </div>
  );
};
