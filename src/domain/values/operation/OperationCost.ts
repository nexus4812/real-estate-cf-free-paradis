import { YieldRate } from "@/domain/values/property/YieldRate";
import { RentTrend } from "@/domain/values/operation/RentTrend";
import { OccupancyRate } from "@/domain/values/operation/OccupancyRate";
import { AnnualCost } from "@/domain/values/operation/AnnualCost";

export class OperationCost {
    constructor(
        public yieldRate: YieldRate,
        public rentTrend: RentTrend,
        public occupancyRate: OccupancyRate,
        public annualCost: AnnualCost
    ) {}

    calculateAnnualIncome(year: number): number {
        // 年間収入の計算ロジックを実装
        return 0; // 仮の戻り値
    }

    calculateExpenditure(year: number): number {
        // 年間支出の計算ロジックを実装
        return 0; // 仮の戻り値
    }
}
