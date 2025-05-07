import { Property } from "@/domain/values/property/Property";
import { Loan } from "@/domain/entities/Loan";
import { OperationCost } from "@/domain/values/operation/OperationCost";

export class Simulator {
    constructor(
        public property: Property,
        public loan: Loan,
        public cost: OperationCost
    ) {}

    calculateYearlyBalance(year: number): number {
        const income = this.cost.calculateAnnualIncome(year);
        const expenditure = this.cost.calculateAnnualExpenditure(year);
        return income - expenditure;
    }

    calculateCumulativeBalance(): number {
        // 実装ロジックを追加
    }
}
