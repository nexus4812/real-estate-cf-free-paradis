/**
 * 支出を計算するValueObject
 */
export class Expenditure {
    constructor(
        private readonly annualCost: number,
        private readonly incomeTax: number,
        private readonly majorRepairCost: number,
        private readonly loanRepayment: number
    ) {}

    /**
     * 支出を計算
     * 支出 = 年間経費＋所得税等(法人税等)＊2＋大規模修繕費＊3＋ローン返済額
     */
    calculate(): number {
        return this.annualCost + (this.incomeTax * 2) + (this.majorRepairCost * 3) + this.loanRepayment;
    }
}
