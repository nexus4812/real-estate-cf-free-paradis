// src/domain/financial_plan/propertyIncome.ts
import { Property } from "../property/property";

/**
 * 物件の年度ごとの収入を計算するクラス。
 */
export class PropertyIncome {
  /**
   * 初期年間家賃収入。
   */
  public readonly initialAnnualRent: number;
  /**
   * 家賃の増減率（年ごと、小数表記 例: 1%増 -> 0.01, 1%減 -> -0.01）。
   */
  public readonly rentIncreaseRate: number;
  /**
   * 空室率（小数表記 例: 10% -> 0.1）。
   */
  public readonly vacancyRate: number;

  /**
   * @param initialAnnualRent - 初期年間家賃収入
   * @param rentIncreaseRate - 家賃の増減率（年ごと）
   * @param vacancyRate - 空室率
   */
  constructor(
    initialAnnualRent: number,
    rentIncreaseRate: number,
    vacancyRate: number,
  ) {
    if (initialAnnualRent < 0) throw new Error("初期年間家賃収入は0以上の値を入力してください。");
    if (vacancyRate < 0 || vacancyRate > 1) throw new Error("空室率は0から1の間の値を入力してください。");

    this.initialAnnualRent = initialAnnualRent;
    this.rentIncreaseRate = rentIncreaseRate;
    this.vacancyRate = vacancyRate;
  }

  /**
   * 指定年度の想定家賃収入を計算します。
   * @param year - 計算対象の年度（1年目から）
   * @returns {number} その年度の想定家賃収入
   */
  public calculatePotentialAnnualRent(year: number): number {
    if (year <= 0) return 0;
    // (1 + 増減率) の (経過年数-1) 乗を初期家賃に乗算
    return Math.round(this.initialAnnualRent * Math.pow(1 + this.rentIncreaseRate, year - 1));
  }

  /**
   * 指定年度の実質収入（空室損を考慮した収入）を計算します。
   * @param property - 物件情報（現在は未使用ですが、将来的な拡張性を考慮して引数に含めます）
   * @param year - 計算対象の年度（1年目から）
   * @returns {number} その年度の実質収入
   */
  public calculateAnnualIncome(property: Property, year: number): number {
    if (year <= 0) return 0;
    const potentialRent = this.calculatePotentialAnnualRent(year);
    return Math.round(potentialRent * (1 - this.vacancyRate));
  }
}
