'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { PropertyInformation } from "@/components/organism/PropertyInformation";
import { SelfFundsInput } from "@/components/molecules/SelfFundsInput";
import { InterestRateInput } from "@/components/molecules/InterestRateInput";
import { LoanTermInput } from "@/components/molecules/LoanTermInput";
import { AnnualIncomeInput } from "@/components/molecules/AnnualIncomeInput";
import { RentIncreaseRateInput } from "@/components/molecules/RentIncreaseRateInput";
import { OccupancyRateInput } from "@/components/molecules/OccupancyRateInput";
import { AnnualCostInput } from "@/components/molecules/AnnualCostInput";
import { SimulationResult } from "@/components/organism/SimulationResult";
import { SimulationChart } from "@/components/organism/SimulationChart";
import { useSimulationStore, SimulationInput } from "@/store/usePropertyStore";

/**
 * 不動産投資シミュレーションのメインページコンポーネントです。
 * ユーザーからの入力を受け付け、シミュレーションを実行し、結果を表示します。
 */
const PropertySimulation = () => {
  const { reset, setInput, runSimulation } = useSimulationStore();
  const { register, handleSubmit, formState: { errors }, getValues } = useForm<SimulationInput>();

  /**
   * フォーム送信時のハンドラーです。
   * フォームの入力値をZustandストアに保存し、シミュレーションを実行します。
   * @param {SimulationInput} data - フォームから取得した入力データ
   */
  const onSubmit: SubmitHandler<SimulationInput> = (data) => {
    setInput(data); // フォームデータをZustandストアに保存
    runSimulation(); // シミュレーションを実行
    console.log("Form Data:", data);
  };

  /**
   * シミュレーションをリセットする関数です。
   * Zustandストアの状態を初期値に戻します。
   */
  const handleReset = () => {
    reset();
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 border-b pb-4 animate-fade-in">不動産投資シミュレーション</h2>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <PropertyInformation register={register} errors={errors} />

        {/* <div className="result-card mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <SimulationResult />
        </div> */}

        <div className="chart-card mb-8 animate-fade-in" style={{ animationDelay: '0.45s' }}>
          <SimulationChart />
        </div>

        <div className="card p-6 mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <h3 className="section-title flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
              <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
            </svg>
            融資条件
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelfFundsInput register={register} errors={errors} />
            <InterestRateInput register={register} errors={errors} />
            <LoanTermInput register={register} errors={errors} />
          </div>
        </div>

        <div className="card p-6 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <h3 className="section-title flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            収入条件
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnnualIncomeInput register={register} errors={errors} />
            <RentIncreaseRateInput register={register} errors={errors} />
            <OccupancyRateInput register={register} errors={errors} />
          </div>
        </div>

        <div className="card p-6 mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <h3 className="section-title flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm4.707 3.707a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L8.414 9H10a3 3 0 013 3v1a1 1 0 102 0v-1a5 5 0 00-5-5H8.414l1.293-1.293z" clipRule="evenodd" />
            </svg>
            支出条件
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnnualCostInput register={register} errors={errors} />
          </div>
        </div>

        <div className="flex justify-center mt-8 space-x-4 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <button 
            type="submit"
            className="btn btn-primary flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            シミュレーション実行
          </button>
          <button 
            type="button" // submit ではなく button に変更
            onClick={handleReset}
            className="btn btn-danger flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
            リセット
          </button>
        </div>
      </form>
    </div>
  );
};

export default PropertySimulation;
