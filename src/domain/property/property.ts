// src/domain/property/property.ts
import { BuildingStructure } from './buildingStructure';

/**
 * 固定資産税率
 */
const fixedAssetRatio = 0.014;

/**
 * 物件の基本情報を保持し、関連する計算を行うクラス。
 */
export class Property {
  /**
   * 土地価格。
   */
  public readonly landPrice: number;
  /**
   * 建物価格。
   */
  public readonly buildingPrice: number;
  /**
   * 建物構造。
   */
  public readonly buildingStructure: BuildingStructure;
  /**
   * 築年数（購入時点）。
   */
  public readonly constructionYear: number;
  /**
   * 延べ床面積（㎡）。
   */
  public readonly buildingArea: number;

  /**
   * @param landPrice - 土地価格
   * @param buildingPrice - 建物価格
   * @param buildingStructure - 建物構造
   * @param constructionYear - 築年数（購入時点での）
   * @param buildingArea - 延べ床面積（㎡）
   */
  constructor(
    landPrice: number,
    buildingPrice: number,
    buildingStructure: BuildingStructure,
    constructionYear: number,
    buildingArea: number
  ) {
    if (landPrice < 0) throw new Error('土地価格は0以上の値を入力してください。');
    if (buildingPrice <= 0) throw new Error('建物価格は0より大きい値を入力してください。');
    if (constructionYear < 0) throw new Error('築年数は0以上の値を入力してください。');
    if (buildingArea <= 0) throw new Error('延べ床面積は0より大きい値を入力してください。');

    this.landPrice = landPrice;
    this.buildingPrice = buildingPrice;
    this.buildingStructure = buildingStructure;
    this.constructionYear = constructionYear;
    this.buildingArea = buildingArea;
  }

  public getPrice(): number {
    return this.landPrice + this.buildingPrice;
  }

  /**
   * 建物の評価割合を取得します
   *
   * @returns {number}
   */
  public getBuildingEvaluationRatio(): number {
    return Number((this.buildingPrice / this.getPrice()).toFixed(0.3));
  }

  /**
   * 経過年数から固定資産税を推定します。
   *
   * 固定資産税 = 建物価格 × (残耐用年数 ÷ 耐用年数) × 固定資産税率
   *
   * ※ 実際の課税評価額とは異なるが、建物価格をもとに耐用年数で比例減額した仮の値を使用しています。
   * ※ 固定資産税は一般的に0円にならないので、残耐用年数は最低でも1年は残して計算を行います
   *
   * @param year 購入からの経過年数
   * @returns 推定される年間固定資産税額（円）
   */
  public estimateFixedAssetTaxForYear(year: number = 0): number {
    const totalDurableYears = this.buildingStructure.getDepreciationYears();
    const remainingYears = Math.max(totalDurableYears - this.constructionYear - year, 1);
    return Number(
      (this.buildingPrice * (remainingYears / totalDurableYears) * fixedAssetRatio).toFixed(2)
    );
  }

  /**
   * 初期費用を推定します。
   * 一般的に物件価格の8%程度とされます。
   * @returns {number} 推定初期費用
   */
  public estimateInitialCosts(): number {
    // 仲介手数料(3% + 6万円 + 消費税)、登記費用、印紙税、不動産取得税などを考慮
    // 簡略化のため、物件価格の8%とする
    return Math.ceil(this.getPrice() * 0.08);
  }

  /**
   * 減価償却の対象年数を計算します。
   * @returns {number} 減価償却の対象年数
   */
  public calculateYearsToDepreciation(): number {
    return this.buildingStructure.calculateYearsToDepreciation(this.constructionYear);
  }

  /**
   * 指定された年度の減価償却費を計算します（定額法）。
   *
   * @param year - 購入からの経過年数 (1年目から)
   * @returns {number} その年度の減価償却費。償却期間外の場合は0。
   */
  public calculateDepreciationForYear(year: number): number {
    if (year <= 0) {
      return 0;
    }
    const yearsToDepreciate = this.calculateYearsToDepreciation();
    // 経過年数が償却年数を超えていたら減価償却は終了
    if (year > yearsToDepreciate) {
      return 0;
    }
    // 建物価格を残存耐用年数で割る (定額法)
    // 残存耐用年数が0以下になることは通常ないが、念のためチェック
    if (yearsToDepreciate <= 0) {
      return 0;
    }
    return Math.round(this.buildingPrice / yearsToDepreciate);
  }
}
