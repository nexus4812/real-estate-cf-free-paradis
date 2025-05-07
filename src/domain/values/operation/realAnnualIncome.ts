/**
 * 実質年間収入を計算するValueObject
 */
export class RealAnnualIncome {
    constructor(
        private readonly expectedIncome: number,
        private readonly rentIncreaseRate: number,
        private readonly elapsedYears: number,
        private readonly occupancyRate: number
    ) {}

    /**
     * 実質年間収入を計算
     * 実質年間収入 = ｛想定年間収入－想定年間収入 ×（家賃増減率 × 経過年数） ｝× 居率
     */
    calculate(): number {
        // 家賃の増減を計算
        const rentAdjustment = this.expectedIncome * (this.rentIncreaseRate * this.elapsedYears);
        
        // 調整後の年間収入
        const adjustedIncome = this.expectedIncome - rentAdjustment;
        
        // 居率を適用
        return adjustedIncome * (this.occupancyRate / 100);
    }
}
