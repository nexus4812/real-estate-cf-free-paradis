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
   * @param propertyPrice - 物件価格
   * @param surfaceYield - 表面利回り
   * @param rentIncreaseRate - 家賃の増減率（年ごと）
   * @param vacancyRate - 空室率
   */
  constructor(
    propertyPrice: number,
    surfaceYield: number,
    rentIncreaseRate: number,
    vacancyRate: number,
  ) {
    if (propertyPrice < 0) throw new Error("物件価格は0以上の値を入力してください。");
    if (surfaceYield < 0) throw new Error("初期年間家賃収入は0以上の値を入力してください。"); 

    this.initialAnnualRent = propertyPrice * surfaceYield;
    this.rentIncreaseRate = rentIncreaseRate;
    this.vacancyRate = vacancyRate;
  }

  /**
   * 指定年度の想定家賃収入を計算します。
   * 
   * @param year - 計算対象の年度（1年目から）
   * @returns {number} その年度の想定家賃収入
   */
  public calculatePotentialAnnualRent(year: number): number {
    if (year <= 0) return 0;
    // (1 + 増減率) の (経過年数-1) を初期家賃に乗算
    return Math.round(this.initialAnnualRent * (1 + (this.rentIncreaseRate * (year))));
  }

  /**
   * 指定年度の実質収入（空室損を考慮した収入）を計算します。
   * @param year - 計算対象の年度（1年目から）
   * @returns {number} その年度の実質収入
   */
  public calculateAnnualIncome(year: number): number {
    if (year <= 0) return 0;
    const potentialRent = this.calculatePotentialAnnualRent(year);
    return Math.round(potentialRent * (1 - this.vacancyRate));
  }
}
