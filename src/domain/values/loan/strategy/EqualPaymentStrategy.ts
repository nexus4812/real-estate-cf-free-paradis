
import { LoanCalculationStrategy } from '@/domain/values/loan/strategy/LoanCalculationStrategy';
import { Loan } from '@/domain/values/loan/Loan';

export class EqualPaymentStrategy implements LoanCalculationStrategy {
    constructor(private loanAmount: number, private interestRate: number, private termYears: number)
    {

    }

    calculateMonthlyPayment(): number {
        const r = this.interestRate / 100 / 12;
        const n = this.termYears * 12;
        const principalPart = this.loanAmount / n;
        const firstInterest = this.loanAmount * r;
        return Math.round(principalPart + firstInterest);
    }

    generateSchedule() {
        const r = this.interestRate / 100 / 12;
        const n = this.termYears * 12;
        const principal = this.loanAmount / n;
        let remaining = this.loanAmount;
        const schedule = [];

        for (let i = 1; i <= n; i++) {
            const interest = remaining * r;
            const total = principal + interest;
            remaining -= principal;
            schedule.push({
                month: i,
                principal: Math.round(principal),
                interest: Math.round(interest),
                total: Math.round(total),
            });
        }

        return schedule;
    }
}
