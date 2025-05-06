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
import { OccupancyRateInput } from "@/components/OccupancyRateInput";
import { AnnualCostInput } from "@/components/AnnualCostInput";
import { SimulationResult } from "@/components/SimulationResult";
import { SimulationChart } from "@/components/SimulationChart";
import { useSimulationStore } from "@/store/usePropertyStore";

const PropertySimulation = () => {
  const { reset } = useSimulationStore();

  // シミュレーションをリセットする関数
  const handleReset = () => {
    reset();
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 border-b pb-4 animate-fade-in">不動産投資シミュレーション</h2>
      
      <div className="card p-6 mb-8 animate-fade-in">
        <h3 className="section-title flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          物件情報
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PropertyPriceInput />
          <ReturnRateInput />
          <StructureInput />
          <AgeInput />
          <AreaInput />
        </div>
      </div>


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
          <SelfFundsInput />
          <InterestRateInput />
          <LoanTermInput />
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
          <AnnualIncomeInput />
          <RentIncreaseRateInput />
          <OccupancyRateInput />
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
          <AnnualCostInput />
        </div>
      </div>

      <div className="flex justify-center mt-8 space-x-4 animate-fade-in" style={{ animationDelay: '0.5s' }}>
        <button 
          onClick={handleReset}
          className="btn btn-danger flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
          </svg>
          リセット
        </button>
      </div>
    </div>
  );
};

export default PropertySimulation;
