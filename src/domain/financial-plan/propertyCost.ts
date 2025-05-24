// src/domain/financial_plan/propertyCost.ts
import { Property } from "../property/property";
import { Loan } from "../loan/loan";
import { LargeScaleRepairPlan } from "./largeScaleRepairPlan";

/**
 * 物件の年度ごとの支出を計算するクラス。
 */
export class PropertyCost {
  /**
   * 物件価格
   */
  public readonly propertyPrice: number;
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
   * @param propertyPrice - 物件価格
   * @param managementFeeRatio - 管理費率
   * @param repairCostRatio - 修繕費率
   * @param largeScaleRepairPlans - 大規模修繕計画のリスト
   * @param loan - 融資情報 (任意)
   */
  constructor(
    propertyPrice: number, 
    managementFeeRatio: number,
    repairCostRatio: number,
    largeScaleRepairPlans: LargeScaleRepairPlan[] = [],
    loan?: Loan,
  ) {
    if (propertyPrice < 1) throw new Error("物件価格は1以上の数字を入力してください");
    if (managementFeeRatio < 0 || managementFeeRatio > 1) throw new Error("管理費率は0から1の間の値を入力してください。");
    if (repairCostRatio < 0 || repairCostRatio > 1) throw new Error("修繕費率は0から1の間の値を入力してください。");

    this.propertyPrice = propertyPrice
    this.managementFeeRatio = managementFeeRatio;
    this.repairCostRatio = repairCostRatio;
    this.loan = loan;
    this.largeScaleRepairPlans = largeScaleRepairPlans;
  }

  /**
   * 固定資産税を概算で計算します。
   * 実際の評価額や軽減措置は複雑なため、ここでは簡略化した計算を行います。
   * @param property - 物件情報
   * @param year - 計算対象の年度（現在は未使用だが、将来的な経年減価補正などを考慮）
   * @returns {number} 概算の年間固定資産税額
   */
  public calculatePropertyTax(property: Property, year: number): number {
    // 土地と建物の評価額を分けて計算することもできるが、ここでは物件価格全体に対する割合で簡略化
    const assessmentValue = property.getPrice() * this.propertyAssessmentRatio;
    // TODO: 経年減価補正を考慮する場合は、yearに応じて建物の評価額を減額する
    // TODO: 新築住宅の軽減措置、小規模住宅用地の特例なども考慮できるとより正確
    return Math.round(assessmentValue * this.propertyTaxRate);
  }

  /**
   * 管理費や修繕費など、年間の運営コストを計算します。
   * ローン返済、大規模修繕費、固定資産税、減価償却費を含みます。
   * @param property - 物件情報
   * @param annualIncome - その年度の年間実質収入（管理費などの計算基準）
   * @param year - 計算対象の年度（1年目から）
   * @returns {number} その年度の総支出額
   */
  public calculateAnnualCosts(
    property: Property,
    annualIncome: number,
    year: number,
  ): number {
    if (year <= 0) return 0;

    const managementFee = annualIncome * this.managementFeeRatio;
    const regularRepairCost = annualIncome * this.repairCostRatio;
    const propertyTax = this.calculatePropertyTax(property, year);

    let loanPayment = 0;
    if (this.loan) {
      loanPayment = this.loan.calculatePaymentAmountForYear(year);
    }

    let largeScaleRepairCostForYear = 0;
    this.largeScaleRepairPlans.forEach(plan => {
      if (plan.repairYear === year) {
        largeScaleRepairCostForYear += plan.repairCost;
      }
    });

    // 減価償却費は会計上の費用であり、キャッシュアウトを伴わないため、
    // ここでの「支出」には含めないのが一般的。別途税金計算などで考慮する。

    const totalCosts =
      managementFee +
      regularRepairCost +
      propertyTax +
      loanPayment +
      largeScaleRepairCostForYear;

    return Math.round(totalCosts);
  }
}
