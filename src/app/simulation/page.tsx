'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { SimulationFormContainer } from '@/container/SimulationFormContainer';
import { SimulationResultContainer } from '@/container/SimulationResultContainer';

/**
 * 不動産投資シミュレーションのメインページコンポーネントです。
 * ユーザーからの入力を受け付け、シミュレーションを実行し、結果を表示します。
 */
const PropertySimulation = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 border-b pb-4 animate-fade-in">
        不動産投資シミュレーション
      </h2>

      <SimulationFormContainer />

      <div className="mt-8">
        <SimulationResultContainer />
      </div>
    </div>
  );
};

export default PropertySimulation;
