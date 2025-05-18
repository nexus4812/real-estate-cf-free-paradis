// src/domain/property/buildingStructure.ts

/**
 * 建物構造の基底クラス。
 * 耐用年数や名称の取得、残存耐用年数の計算機能を提供します。
 */
export abstract class BuildingStructure {
  /**
   * 法定耐用年数を取得します。
   * @returns {number} 法定耐用年数（年）
   */
  abstract getDepreciationYears(): number;

  /**
   * 建物構造の日本語名を取得します。
   * @returns {string} 建物構造の日本語名
   */
  abstract label(): string;

  /**
   * 指定された築年数における残存耐用年数を計算します。
   * @param {number} ageOfBuilding - 建物の築年数（年）
   * @returns {number} 残存耐用年数（年）。法定耐用年数を超えている場合は0を返します。
   */
  public calculateRemainingUsefulLifeForYear(ageOfBuilding: number): number {
    const depreciationYears = this.getDepreciationYears();
    const remainingLife = depreciationYears - ageOfBuilding;
    return Math.max(0, remainingLife);
  }
}

/**
 * 鉄筋コンクリート造（RC）を表すクラス。
 */
export class RC extends BuildingStructure {
  /**
   * RC造の法定耐用年数を取得します。
   * @returns {number} 47年
   */
  getDepreciationYears(): number {
    return 47;
  }

  /**
   * RC造の日本語名を取得します。
   * @returns {string} "鉄筋コンクリート造"
   */
  label(): string {
    return "鉄筋コンクリート造";
  }
}

/**
 * 鉄骨鉄筋コンクリート造（SRC）を表すクラス。
 */
export class SRC extends BuildingStructure {
  /**
   * SRC造の法定耐用年数を取得します。
   * @returns {number} 47年
   */
  getDepreciationYears(): number {
    return 47;
  }

  /**
   * SRC造の日本語名を取得します。
   * @returns {string} "鉄骨鉄筋コンクリート造"
   */
  label(): string {
    return "鉄骨鉄筋コンクリート造";
  }
}

/**
 * 鉄骨造（Steel）を表すクラス。
 * 骨格材の厚みによって耐用年数が変わるため、コンストラクタで指定します。
 */
export class Steel extends BuildingStructure {
  private readonly years: number;

  /**
   * @param {number} thickness - 骨格材の厚み(mm)。4mm超なら34年、3mm超4mm以下なら27年、3mm以下なら19年。
   */
  constructor(thickness: number) {
    super();
    if (thickness > 4) {
      this.years = 34;
    } else if (thickness > 3) {
      this.years = 27;
    } else {
      this.years = 19;
    }
  }

  /**
   * 鉄骨造の法定耐用年数を取得します。
   * @returns {number} 骨格材の厚みに応じた耐用年数
   */
  getDepreciationYears(): number {
    return this.years;
  }

  /**
   * 鉄骨造の日本語名を取得します。
   * @returns {string} "鉄骨造"
   */
  label(): string {
    return "鉄骨造";
  }
}

/**
 * 木造（Wood）を表すクラス。
 */
export class Wood extends BuildingStructure {
  /**
   * 木造の法定耐用年数を取得します。
   * @returns {number} 22年
   */
  getDepreciationYears(): number {
    return 22;
  }

  /**
   * 木造の日本語名を取得します。
   * @returns {string} "木造"
   */
  label(): string {
    return "木造";
  }
}
