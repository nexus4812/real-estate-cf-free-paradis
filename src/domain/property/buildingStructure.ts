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

    /**
     * 減価償却の対象年数を計算します。
     * 建物構造の法定耐用年数と経過年数に基づき、
     * ・法定耐用年数を超えていない場合は「法定耐用年数 - 経過年数」
     * ・超過している場合は「法定耐用年数 × 20%（ただし最低2年）」
     * を減価償却年数として返します。
     *
     * @param {number} elapsedYear 建築からの経過年数
     * @returns {number} 減価償却に使う耐用年数
     */
    public calculateYearsToDepreciation(elapsedYear: number): number {
        const lawYears = this.getDepreciationYears(); // 法定耐用年数
        const remainingYears = Math.floor(lawYears - elapsedYear);

        if (remainingYears > 2) {
            return remainingYears;
        }

        if (remainingYears >= 0) {
            return 2;
        }

        const simpleYears = Math.floor(lawYears * 0.2);
        return Math.max(simpleYears, 2); // 最低2年
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

  /**
   * 鉄骨造の法定耐用年数を取得します。
   * @returns {number} 骨格材の厚みに応じた耐用年数
   */
  getDepreciationYears(): number {
    return 34; // 骨格材の厚み(mm)。4mm超なら34年、3mm超4mm以下なら27年、3mm以下なら19年ではあるが、一旦大半が4mm以上なので34とする
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

export const allBuildingStructures: BuildingStructure[] = [
    new SRC(),
    new RC(),
    new Steel(),
    new Wood(),
]
