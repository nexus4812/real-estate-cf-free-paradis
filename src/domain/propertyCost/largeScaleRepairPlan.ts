// src/domain/financial_plan/largeScaleRepairPlan.ts

/**
 * 大規模修繕計画の情報を保持するクラス。
 */
export class LargeScaleRepairPlan {
  /**
   * 大規模修繕にかかる費用。
   */
  public readonly repairCost: number;
  /**
   * 大規模修繕を実施する年度（購入からの経過年数）。
   */
  public readonly repairYear: number;

  /**
   * @param repairCost - 大規模修繕をする費用
   * @param repairYear - 大規模修繕をする年度
   */
  constructor(repairCost: number, repairYear: number) {
    if (repairCost < 0) throw new Error('修繕費用は0以上の値を入力してください。');
    if (repairYear <= 0) throw new Error('修繕年度は1以上の値を入力してください。');

    this.repairCost = repairCost;
    this.repairYear = repairYear;
  }
}
