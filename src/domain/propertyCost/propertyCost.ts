// src/domain/financial_plan/propertyCost.ts
import { Property } from '../property/property';
import { Loan } from './loan';
import { LargeScaleRepairPlan } from './largeScaleRepairPlan';
import { PropertyIncome } from '../propertyIncome/propertyIncome';

/**
 * 物件の年度ごとの支出を計算するクラス。
 */
export class PropertyCost {
  /**
   * 物件から発生する収益
   */
  public readonly propertyIncome: PropertyIncome;
  /**
   * 管理費率（収入に対する割合、小数表記 例: 5% -> 0.05）。
   */
  public readonly managementFeeRatio: number;
  /**
   * 修繕費率（収入に対する割合、小数表記 例: 5% -> 0.05）。
   * 日常的な修繕費であり、大規模修繕とは別。
   */
  public readonly repairCostRatio: number;
  /**
   * 融資情報。融資がない場合は undefined。
   */
  public readonly loan?: Loan = undefined;
  /**
   * 大規模修繕計画のリスト。
   */
  public readonly largeScaleRepairPlans: LargeScaleRepairPlan[];
  /**
   * 固定資産税評価額の物件価格に対する割合（概算用）。
   * 一般的に土地は時価の70%、建物は新築時請負価格の50-70%程度。ここでは簡略化のため物件価格の70%とする。
   */
  private readonly propertyAssessmentRatio: number = 0.7;
  /**
   * 固定資産税・都市計画税の標準税率（合計）。
   * 固定資産税1.4%、都市計画税0.3% (最大)
   */
  private readonly propertyTaxRate: number = 0.017; // 1.4% + 0.3%

  /**
   * @param propertyIncome - 実質年収（管理費などの計算用）
   * @param managementFeeRatio - 管理費率
   * @param repairCostRatio - 修繕費率
   * @param largeScaleRepairPlans - 大規模修繕計画のリスト
   * @param loan - 融資情報 (任意)
   */
  constructor(
    propertyIncome: PropertyIncome,
    managementFeeRatio: number,
    repairCostRatio: number,
    largeScaleRepairPlans: LargeScaleRepairPlan[] = [],
    loan?: Loan
  ) {
    if (managementFeeRatio < 0 || managementFeeRatio > 1)
      throw new Error('管理費率は0から1の間の値を入力してください。');
    if (repairCostRatio < 0 || repairCostRatio > 1)
      throw new Error('修繕費率は0から1の間の値を入力してください。');

    this.propertyIncome = propertyIncome;
    this.managementFeeRatio = managementFeeRatio;
    this.repairCostRatio = repairCostRatio;
    this.loan = loan;
    this.largeScaleRepairPlans = largeScaleRepairPlans;
  }

  /**
   * 固定資産税を概算で計算します。
   *
   * @param year - 計算対象の年度
   * @returns {number} 概算の年間固定資産税額
   */
  public calculatePropertyTax(year: number): number {
    return this.propertyIncome.property.estimateFixedAssetTaxForYear(year);
  }

  /**
   * 年間の管理費を計算します
   */
  public calculateRealAnnualManagementFee(): number {
    // 管理費は家賃の下落と共に下がるとは考え辛い部分も多いので（共用部分など）、一年目の収入を元に固定値とする
    return Math.round(this.propertyIncome.calculateAnnualIncome(1) * this.managementFeeRatio);
  }

  /**
   * 年間の修繕費を計算します
   */
  public calculateRealRepairCost(): number {
    // 修繕費は家賃の下落と共に下がるとは考え辛い部分も多いので、一年目の収入を元に固定値とする
    return Math.round(this.propertyIncome.calculateAnnualIncome(1) * this.repairCostRatio);
  }

  /**
   * 対象年度の対規模修繕にかかる費用を取得します
   */
  public getLargeScaleRepairCostForYear(year: number): number {
    return this.largeScaleRepairPlans.find((plan) => plan.repairYear === year)?.repairCost ?? 0;
  }

  /**
   * 管理費や修繕費など、年間の運営コストを計算します。
   * ローン返済、大規模修繕費、固定資産税、減価償却費を含みます。
   *
   * @param annualIncome - その年度の年間実質収入（管理費などの計算基準）
   * @param year - 計算対象の年度（1年目から）
   * @returns {number} その年度の総支出額
   */
  public calculateAnnualCosts(year: number): number {
    if (year <= 0) return 0;

    const managementFee = this.calculateRealAnnualManagementFee();
    const regularRepairCost = this.calculateRealRepairCost();
    const propertyTax = this.calculatePropertyTax(year);
    const largeScaleRepairCost = this.getLargeScaleRepairCostForYear(year);

    let loanPayment = 0;
    if (this.loan) {
      loanPayment = this.loan.calculatePaymentAmountForYear(year);
    }

    // 減価償却費は会計上の費用であり、キャッシュアウトを伴わないため、
    // ここでの「支出」には含めないのが一般的。別途税金計算などで考慮する。

    const totalCosts =
      managementFee + regularRepairCost + propertyTax + loanPayment + largeScaleRepairCost;

    return Math.round(totalCosts);
  }

  /**
   * 対象年度の減価償却費を計算します。
   *
   * @param year - 計算対象の年度（1年目から）
   * @returns {number} その年度の減価償却費
   */
  public calculateDepreciationForYear(year: number): number {
    if (year <= 0) return 0;
    return this.propertyIncome.property.calculateDepreciationForYear(year);
  }
}
