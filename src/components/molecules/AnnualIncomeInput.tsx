"use client";

import { useSimulationStore } from "@/store/usePropertyStore";
import { PropertyIncome } from "@/domain/propertyIncome/propertyIncome";
import { Property } from "../../domain/property/property";


/**
 * 年間収入の表示コンポーネントです。
 * 物件価格と表面利回りから自動計算された初年度年間収入を表示します。
 */
export const AnnualIncomeInput = () => {
  const { input } = useSimulationStore();
  
  /**
   * Property と PropertyIncome インスタンスを作成し、年間収入を計算します。
   * input.structure は BuildingStructure のインスタンスである必要があるため、
   * input.structure が適切に初期化されていることを前提とします。
   */
  /**
   * Property インスタンスを作成します。
   * input.structure は BuildingStructure のインスタンスである必要があります。
   */
  const property = new Property(
    input.landPrice,
    input.buildingPrice,
    input.structure,
    input.constructionYear,
    input.buildingArea
  );

  /**
   * PropertyIncome インスタンスを作成し、年間収入を計算します。
   */
  const propertyIncome = new PropertyIncome(
    property,
    input.surfaceYield,
    input.rentIncreaseRate,
    input.vacancyRate
  );

  const annualIncome = propertyIncome.calculateAnnualIncome(1); // 初年度の年間収入を計算
  
  /**
   * 数値を通貨形式にフォーマットします。
   * @param {number} amount - フォーマットする数値
   * @returns {string} フォーマットされた文字列
   */
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('ja-JP').format(amount);
  };

  return (
    <div>
      <label htmlFor="annualIncome" className="block text-sm font-medium text-gray-700 mb-1">初年度年間収入:</label>
      <div className="relative rounded-md shadow-sm">
        <div className="p-2 block w-full border border-gray-300 bg-gray-100 rounded-md">
          {formatCurrency(annualIncome)} 円
        </div>
        <div className="text-xs text-gray-500 mt-1">
          物件価格と利回りから自動計算されます
        </div>
      </div>
    </div>
  );
};
