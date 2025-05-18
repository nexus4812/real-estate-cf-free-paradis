// src/domain/property/property.ts
import { BuildingStructure } from "./buildingStructure";

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
   * @param price - 購入時の物件価格（建物+土地）
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
    buildingArea: number,
  ) {
    if (landPrice < 0) throw new Error("土地価格は0以上の値を入力してください。");
    if (buildingPrice <= 0) throw new Error("建物価格は0より大きい値を入力してください。");
    if (constructionYear < 0) throw new Error("築年数は0以上の値を入力してください。");
    if (buildingArea <= 0) throw new Error("延べ床面積は0より大きい値を入力してください。");

    this.landPrice = landPrice;
    this.buildingPrice = buildingPrice;
    this.buildingStructure = buildingStructure;
    this.constructionYear = constructionYear;
    this.buildingArea = buildingArea;
  }

  public getPrice(): number{
    return this.landPrice + this.buildingPrice;
  }

  /**
   * 初期費用を推定します。
   * 一般的に物件価格の7%程度とされます。
   * @returns {number} 推定初期費用
   */
  public estimateInitialCosts(): number {
    // 仲介手数料(3% + 6万円 + 消費税)、登記費用、印紙税、不動産取得税などを考慮
    // 簡略化のため、物件価格の7%とする
    return this.getPrice() * 0.07;
  }

  /**
   * 減価償却の対象年数を計算します。
   * 建物構造の法定耐用年数から築年数を引いたものですが、
   * 法定耐用年数を超過している場合は、法定耐用年数の20%を償却年数とします。
   * @returns {number} 減価償却の対象年数
   */
  public calculateYearsToDepreciation(): number {
    const usefulLife = this.buildingStructure.getDepreciationYears();
    const remainingUsefulLife = usefulLife - this.constructionYear;

    if (remainingUsefulLife > 0) {
      return remainingUsefulLife;
    } else {
      // 法定耐用年数を超過している場合
      return Math.floor(usefulLife * 0.2);
    }
  }
}
