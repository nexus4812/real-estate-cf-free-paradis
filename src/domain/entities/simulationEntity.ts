import {SimulationInput} from "@/domain/entities/SimulationInput"
import {RealAnnualIncome} from "@/domain/values/realAnnualIncome"
import {Expenditure} from "@/domain/values/expenditure"
import {LoanPlan} from "@/domain/values/LoanPlan"
import {PropertyPrice} from "@/domain/values/PropertyPrice"
import {YieldRate} from "@/domain/values/YieldRate"
import {Structure} from "@/domain/entities/Structure"
import {Age} from "@/domain/values/Age"
import {Area} from "@/domain/values/Area"
import {RentTrend} from "@/domain/values/RentTrend"
import {OccupancyRate} from "@/domain/values/OccupancyRate"
import {AnnualCost} from "@/domain/values/AnnualCost"

export type SimulationProps = {
    /**
     * 物件価格
     */
    propertyPrice: number;

    /**
     * 利回
     */
    returnRate: number;

    /**
     * 建物構造
     */
    structure: Structure;

    /**
     * 築年数数
     */
    age: number;

    /**
     * 建物面積
     */
    area: number;

    /**
     * 自己資金
     */
    selfFunds: number;

    /**
     * ローン金利
     */
    interestRate: number;

    /**
     * ローン期間
     */
    loanTerm: number;

    /**
     * 家賃増減率
     */
    rentIncreaseRate: number;

    /**
     * 居率（0〜100%）
     */
    occupancyRate: number;

    /**
     * 年間経費
     */
    annualCost: number;
};


export class SimulationEntity {
    constructor(public props: SimulationProps) {}

    /**
     * 初年度の収入（家賃下落率、満室時）
     * @returns
     */
    calculateAnnualIncome(): number {
        return Math.floor((this.props.propertyPrice * this.props.returnRate) / 100);
    }

    /**
     * 所得税等（法人税等）を計算
     * @param year 経過年数
     * @returns 所得税等の金額
     */
    calculateIncomeTax(year: number): number {
        // 実質年間収入を計算
        const realAnnualIncome = this.calculateRealAnnualIncome(year);
        
        // 所得税等の計算ロジックを実装
        // 仮の実装として、実質年間収入の10%とする
        return Math.floor(realAnnualIncome * 0.1);
    }

    /**
     * 大規模修繕費を計算
     * @param year 経過年数
     * @returns 大規模修繕費の金額
     */
    calculateMajorRepairCost(year: number): number {
        // 建物の経過年数（築年数 + シミュレーション経過年数）
        const totalAge = this.props.age + year;
        
        // 建物の構造に基づいて減価償却年数を取得
        const depreciationYears = this.props.structure.getDepreciationYears();
        
        // 大規模修繕費の計算ロジックを実装
        // 仮の実装として、物件価格の0.5%に経過年数の係数を掛けたものとする
        const ageFactor = Math.min(totalAge / depreciationYears, 1); // 経過年数の係数（最大1）
        return Math.floor(this.props.propertyPrice * 0.005 * ageFactor);
    }

    /**
     * 月々のローン返済額を計算
     * @returns 月々のローン返済額
     */
    calculateMonthlyLoanPayment(): number {
        const loanAmount = this.props.propertyPrice - this.props.selfFunds; // ローン金額 = 物件価格 - 自己資金
        
        // 月利計算 (年利 ÷ 12)
        const monthlyInterestRate = this.props.interestRate / 100 / 12;
        
        // 月々の返済額計算 (元利均等返済方式)
        const totalPayments = this.props.loanTerm * 12; // 返済回数
        const monthlyPayment = loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments) / (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);
        
        return isNaN(monthlyPayment) ? 0 : Math.round(monthlyPayment);
    }

    /**
     * 年間のローン返済額を計算
     * @returns 年間のローン返済額
     */
    calculateAnnualLoanPayment(): number {
        return this.calculateMonthlyLoanPayment() * 12;
    }

    /**
     * 実質年間収入を計算
     * @param year 経過年数
     * @returns 実質年間収入
     */
    calculateRealAnnualIncome(year: number): number {
        const expectedIncome = this.calculateAnnualIncome();
        const realAnnualIncome = new RealAnnualIncome(
            expectedIncome,
            this.props.rentIncreaseRate,
            year,
            this.props.occupancyRate
        );
        return Math.floor(realAnnualIncome.calculate());
    }

    /**
     * 年間支出を計算
     * @param year 経過年数
     * @returns 年間支出
     */
    calculateAnnualExpenditure(year: number): number {
        const incomeTax = this.calculateIncomeTax(year);
        const majorRepairCost = this.calculateMajorRepairCost(year);
        const loanRepayment = this.calculateAnnualLoanPayment();
        
        const expenditure = new Expenditure(
            this.props.annualCost,
            incomeTax,
            majorRepairCost,
            loanRepayment
        );
        
        return Math.floor(expenditure.calculate());
    }

    /**
     * 年間収支を計算
     * @param year 経過年数
     * @returns 年間収支
     */
    calculateAnnualBalance(year: number): number {
        const income = this.calculateRealAnnualIncome(year);
        const expenditure = this.calculateAnnualExpenditure(year);
        return income - expenditure;
    }
}
