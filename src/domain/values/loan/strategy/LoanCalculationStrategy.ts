
export interface LoanCalculationStrategy {
    calculateMonthlyPayment(loanAmount: number, interestRate: number, termYears: number): number;
    generateSchedule(loanAmount: number, interestRate: number, termYears: number): { month: number, principal: number, interest: number, total: number }[];
}
