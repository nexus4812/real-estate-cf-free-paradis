import { Property } from '../property/property';
import { PropertyIncome } from '../propertyIncome/propertyIncome';
import { PropertyCost } from '../propertyCost/propertyCost';

/**
 * 物件の年度ごとの収支と利回りを計算するクラス。
 */
export class PropertyBalanceSheet {
  /**
   * 物件情報。
   */
  public readonly property: Property;
  /**
   * 収入に関する情報。
   */
  public readonly income: PropertyIncome;
  /**
   * 支出に関する情報。
   */
  public readonly cost: PropertyCost;

  /**
   * @param property - 物件情報
   * @param income - 収入に関する情報
   * @param cost - 支出に関する情報
   */
  constructor(property: Property, income: PropertyIncome, cost: PropertyCost) {
    this.property = property;
    this.income = income;
    this.cost = cost;
  }

  /**
   * 指定された年度の年間収支（キャッシュフロー）を計算します。
   * @param year - 計算対象の年度（1年目から）
   * @returns {number} その年度の年間収支
   */
  public calculateAnnualBalanceForYear(year: number): number {
    if (year <= 0) return 0;

    const annualIncome = this.income.calculateAnnualIncome(year);
    const annualCosts = this.cost.calculateAnnualCosts(year);

    return annualIncome - annualCosts;
  }

  /**
   * 指定された年度の表面利回りを計算します。
   * 表面利回り = 年間家賃収入 / 物件価格
   * @param year - 計算対象の年度（1年目から）
   * @returns {number} その年度の表面利回り（小数表記 例: 5% -> 0.05）
   */
  public calculateGrossYieldForYear(year: number): number {
    if (year <= 0) return 0;
    if (this.property.getPrice() === 0) return 0; // 0除算を防ぐ

    const potentialAnnualRent = this.income.calculatePotentialAnnualRent(year);
    return potentialAnnualRent / this.property.getPrice();
  }

  /**
   * 指定された年度の実質利回りを計算します。
   * 実質利回り = (年間家賃収入 - 年間諸経費) / (物件価格 + 購入時諸経費)
   * ここでの年間諸経費は、ローン返済金利と減価償却費は含めず、運営に関わる費用のみとします。
   * @param year - 計算対象の年度（1年目から）
   * @returns {number} その年度の実質利回り（小数表記 例: 5% -> 0.05）
   */
  public calculateRealYieldForYear(year: number): number {
    if (year <= 0) return 0;

    const annualIncome = this.income.calculateAnnualIncome(year);
    const netOperatingIncome = annualIncome - this.cost.calculateAnnualCosts(year);
    const totalInvestment = this.property.getPrice() + this.property.estimateInitialCosts();

    if (totalInvestment === 0) return 0; // 0除算を防ぐ

    return netOperatingIncome / totalInvestment;
  }

  /**
   * 指定された年度の税引前キャッシュフローを計算します。
   * 税引前キャッシュフロー = 年間収入 - (年間運営費 + 年間ローン返済額)
   * @param year - 計算対象の年度
   * @returns {number} 税引前キャッシュフロー
   */
  public calculatePreTaxCashFlowForYear(year: number): number {
    if (year <= 0) return 0;
    const annualIncome = this.income.calculateAnnualIncome(year);
    const annualCosts = this.cost.calculateAnnualCosts(year);
    return annualIncome - annualCosts;
  }

  /**
   * 指定された年度の課税所得を計算します。
   * 課税所得 = 年間収入 - 年間運営費(ローン金利含む) - 減価償却費
   * @param year - 計算対象の年度
   * @returns {number} 課税所得
   */
  public calculateTaxableIncomeForYear(year: number): number {
    if (year <= 0) return 0;

    const annualRealIncome = this.income.calculateAnnualIncome(year);

    // 税法上の経費を計算
    const managementFee = this.cost.calculateRealAnnualManagementFee();
    const regularRepairCost = this.cost.calculateRealRepairCost();
    const propertyTax = this.cost.calculatePropertyTax(year);
    const largeScaleRepairCost = this.cost.getLargeScaleRepairCostForYear(year);
    const depreciation = this.cost.calculateDepreciationForYear(year);

    let loanInterestPayment = 0;
    if (this.cost.loan) {
      loanInterestPayment = this.cost.loan.calculateInterestPaymentForYear(year);
    }

    const totalTaxDeductibleExpenses =
      managementFee +
      regularRepairCost +
      propertyTax +
      largeScaleRepairCost +
      loanInterestPayment +
      depreciation;

    return Math.round(annualRealIncome - totalTaxDeductibleExpenses);
  }

  /**
   * 指定されたシミュレーション期間後の最終資産価値を計算します。
   * 最終資産価値 = (土地価格 + (建物価格 - 減価償却累計額)) - ローン残債
   * @param simulationYears - シミュレーション期間（年）
   * @returns {number} 最終資産価値
   */
  public calculateFinalAssetValue(simulationYears: number): number {
    // 減価償却累計額の計算
    let totalDepreciation = 0;
    for (let year = 1; year <= simulationYears; year++) {
      totalDepreciation += this.property.calculateDepreciationForYear(year);
    }

    // 建物残存価値
    const remainingBuildingValue = Math.max(0, this.property.buildingPrice - totalDepreciation);

    // 物件の最終価値
    const finalPropertyValue = this.property.landPrice + remainingBuildingValue;

    // ローン残債
    const remainingLoanBalance = this.cost.loan
      ? this.cost.loan.calculateRemainingBalanceForYear(simulationYears)
      : 0;

    return finalPropertyValue - remainingLoanBalance;
  }
}
