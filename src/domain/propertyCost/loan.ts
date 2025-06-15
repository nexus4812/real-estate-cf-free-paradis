// src/domain/loan/loan.ts

type MonthlyRepayment = {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
};

function simulateEqualRepayment(
  loanAmount: number,
  annualInterestRate: number,
  loanPeriodYears: number
): MonthlyRepayment[] {
  const monthlyInterestRate = annualInterestRate / 12;
  const totalMonths = loanPeriodYears * 12;

  const monthlyPayment =
    (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -totalMonths));

  let balance = loanAmount;

  return Array.from({ length: totalMonths }, (_, i) => {
    const interest = balance * monthlyInterestRate;
    const principal = monthlyPayment - interest;
    balance = Math.max(0, balance - principal);

    // 最終月は誤差を調整
    if (i === totalMonths - 1 && Math.abs(balance) < 0.01) {
      balance = 0;
    }

    return {
      month: i + 1,
      payment: parseFloat(monthlyPayment.toFixed(0)), // 支払い金額
      principal: parseFloat(principal.toFixed(0)), // 支払い額における元金の金額
      interest: parseFloat(interest.toFixed(0)), // 支払い額における金利の金額
      balance: parseFloat(balance.toFixed(0)), // 残りのローン残高
    };
  });
}

/**
 * 融資に関する情報を保持し、返済額計算などを行うクラス。
 */
export class Loan {
  /**
   * 借入金額。
   */
  public readonly amount: number;
  /**
   * 金利（年利、パーセンテージではない小数表記 例: 1.5% -> 0.015）。
   */
  public readonly interestRate: number;
  /**
   * 借入期間（年数）。
   */
  public readonly term: number;

  /**
   * 内部的に保持するシュミレーション結果
   * 本来あまりコンストラクタで計算すべきではないが、事前に計算しておかないとgetterにロジックが散らばるのでこうした
   */
  private readonly simulate: MonthlyRepayment[];

  /**
   * @param amount - 借入金額
   * @param interestRate - 金利（年利、例: 0.015）
   * @param term - 借入年数
   */
  constructor(amount: number, interestRate: number, term: number) {
    if (amount <= 0) throw new Error('借入金額は0より大きい値を入力してください。');
    if (interestRate <= 0) throw new Error('金利は0より大きい値を入力してください。');
    if (term <= 0) throw new Error('借入年数は0より大きい値を入力してください。');

    this.amount = amount;
    this.interestRate = interestRate;
    this.term = term;
    this.simulate = simulateEqualRepayment(this.amount, this.interestRate, this.term);
  }

  /**
   * 総額の支払い額を計算します。
   * @returns {number}
   */
  public calculateTotalPaymentAmount(): number {
    return +this.simulate
      .map<number>((row) => row.payment)
      .reduce<number>((acc, curr) => acc + curr, 0)
      .toFixed(0);
  }

  /**
   * 指定された年度の年間支払額（元利均等返済）を計算します。
   * @param year - 計算対象の年度（1年目からterm年目まで）
   * @returns {number} その年度の年間支払額。借入期間外の場合は0を返します。
   */
  public calculatePaymentAmountForYear(year: number): number {
    const startMonth = (year - 1) * 12 + 1;
    const endMonth = year * 12;

    return +this.simulate
      .filter((row) => startMonth <= row.month && row.month <= endMonth)
      .map((row) => row.payment)
      .reduce<number>((acc, curr) => acc + curr, 0)
      .toFixed(2);
  }

  /**
   * 指定された年度の年間利息支払額を計算します。
   * @param year - 計算対象の年度（1年目からterm年目まで）
   * @returns {number} その年度の年間利息支払額。借入期間外の場合は0を返します。
   */
  public calculateInterestPaymentForYear(year: number): number {
    const startMonth = (year - 1) * 12 + 1;
    const endMonth = year * 12;

    return this.simulate
      .filter((row) => startMonth <= row.month && row.month <= endMonth)
      .map((row) => row.interest)
      .reduce<number>((acc, curr) => acc + curr, 0);
  }

  /**
   * 指定された年度の年間元金返済額を計算します。
   * @param year - 計算対象の年度（1年目からterm年目まで）
   * @returns {number} その年度の年間元金返済額。借入期間外の場合は0を返します。
   */
  public calculatePrincipalPaymentForYear(year: number): number {
    const startMonth = (year - 1) * 12 + 1;
    const endMonth = year * 12;

    return this.simulate
      .filter((row) => startMonth <= row.month && row.month <= endMonth)
      .map((row) => row.principal)
      .reduce<number>((acc, curr) => acc + curr, 0);
  }

  /**
   * 指定された年度末のローン残債を計算します。
   * @param year - 計算対象の年度（1年目からterm年目まで）
   * @returns {number} その年度末のローン残債。借入期間外の場合は0を返します。
   */
  public calculateRemainingBalanceForYear(year: number): number {
    const endMonth = year * 12;
    const lastMonthData = this.simulate.findLast((row) => row.month <= endMonth);
    return lastMonthData ? lastMonthData.balance : 0;
  }
}
