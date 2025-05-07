import { LoanType } from '@/domain/values/loan/LoanType';
import { EqualPaymentStrategy } from '@/domain/values/loan/strategy/EqualPaymentStrategy';
import { LoanCalculationStrategy } from '@/domain/values/loan/strategy/LoanCalculationStrategy';

export class Loan {
    constructor(
        public readonly loanAmount: number,
        public readonly interestRate: number, 
        public readonly termYears: number, 
        public readonly loanType: LoanType) {
    }

    public strategy(): LoanCalculationStrategy
    {
        if (this.loanType.isEqualPayment()) {
            return new EqualPaymentStrategy(
                this.loanAmount,
                this.interestRate,
                this.termYears
            )
        }

        throw new Error(`Invalid loan type: ${this.loanType.value}`); 
    }

    totalMonths(): number {
        return this.termYears * 12;
    }
}
