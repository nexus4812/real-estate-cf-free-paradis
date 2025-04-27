import {Structure} from "@/domain/values/structure"

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
};

export class SimulationEntity {
    constructor(public props: SimulationProps) {}

    /**
     * 初年度の収入（家賃下落率、満室時）
     * @returns
     */
    calculateAnnualIncome(): number | null {
        return Math.floor((this.props.propertyPrice * this.props.returnRate) / 100);
    }
}
