'use client';

import React from 'react';
import PropertyPriceInput from '@/components/PropertyPriceInput';
import { ReturnRateInput } from "@/components/ReturnRateInput";
import { StructureInput } from "@/components/StructureInput";
import { AgeInput } from "@/components/AgeInput";
import { AreaInput } from "@/components/AreaInput";
import { SelfFundsInput } from "@/components/SelfFundsInput";
import { InterestRateInput } from "@/components/InterestRateInput";
import { LoanTermInput } from "@/components/LoanTermInput";
import { AnnualIncomeInput } from "@/components/AnnualIncomeInput";
import { RentIncreaseRateInput } from "@/components/RentIncreaseRateInput";
import { AnnualCostInput } from "@/components/AnnualCostInput";
import { SimulationResult } from "@/components/SimulationResult";
import { useSimulationStore } from "@/store/usePropertyStore";

const PropertySimulation = () => {
  const { reset } = useSimulationStore();

  // シミュレーションをリセットする関数
  const handleReset = () => {
    reset();
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">不動産投資シミュレーション</h2>
      
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="text-xl font-semibold mb-4">物件情報</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PropertyPriceInput />
          <ReturnRateInput />
          <StructureInput />
          <AgeInput />
          <AreaInput />
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="text-xl font-semibold mb-4">融資条件</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelfFundsInput />
          <InterestRateInput />
          <LoanTermInput />
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="text-xl font-semibold mb-4">収入条件</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnnualIncomeInput />
          <RentIncreaseRateInput />
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="text-xl font-semibold mb-4">支出条件</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnnualCostInput />
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow mb-6">
        <SimulationResult />
      </div>

      <div className="flex justify-center mt-6">
        <button 
          onClick={handleReset}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-4"
        >
          リセット
        </button>
      </div>
    </div>
  );
};

export default PropertySimulation;
