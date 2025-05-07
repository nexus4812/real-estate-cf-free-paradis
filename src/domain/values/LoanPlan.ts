export class LoanPlan {
    interestRate: number; // ローン金利（％）
    termYears: number; // ローン期間（年）

    constructor(interestRate: number, termYears: number) {
        this.interestRate = interestRate;
        this.termYears = termYears;
    }

    monthlyPayment(): number {
        const loanAmount = 1000000; // 仮のローン金額
        const monthlyInterestRate = this.interestRate / 100 / 12;
        const totalPayments = this.termYears * 12;
        const monthlyPayment = loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments) / (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);
        return isNaN(monthlyPayment) ? 0 : Math.round(monthlyPayment);
    }

    totalRepayment(): number {
        return this.monthlyPayment() * this.termYears * 12;
    }
}
