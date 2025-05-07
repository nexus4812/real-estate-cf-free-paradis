export class Loan {
    constructor(
        public interestRate: number,
        public termYears: number,
        public selfFunds: number
    ) {}

    monthlyPayment(): number {
        // 月々の支払額の計算ロジックを実装
        return 0; // 仮の戻り値
    }

    yearlyPayment(): number {
        // 年間の支払額の計算ロジックを実装
        return 0; // 仮の戻り値
    }

    remainingBalance(year: number): number {
        // 残高の計算ロジックを実装
        return 0; // 仮の戻り値
    }
}
