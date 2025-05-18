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
  const monthlyInterestRate = annualInterestRate / 100 / 12;
  const totalMonths = loanPeriodYears * 12;

  const monthlyPayment = loanAmount * monthlyInterestRate /
    (1 - Math.pow(1 + monthlyInterestRate, -totalMonths));

  let balance = loanAmount;

  return Array.from({ length: totalMonths }, (_, i) => {
    const interest = balance * monthlyInterestRate;
    const principal = monthlyPayment - interest;
    balance -= principal;

    // 最終月は誤差を調整
    if (i === totalMonths - 1 && Math.abs(balance) < 0.01) {
      balance = 0;
    }

    return {
      month: i + 1,
      payment: parseFloat(monthlyPayment.toFixed(2)), // 支払い金額
      principal: parseFloat(principal.toFixed(2)), // 支払い額における元金の金額
      interest: parseFloat(interest.toFixed(2)), // 支払い額における金利の金額
      balance: parseFloat(balance.toFixed(2)) // 残りのローン残高
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
    if (amount <= 0) throw new Error("借入金額は0より大きい値を入力してください。");
    if (interestRate <= 0) throw new Error("金利は0より大きい値を入力してください。");
    if (term <= 0) throw new Error("借入年数は0より大きい値を入力してください。");

    this.amount = amount;
    this.interestRate = interestRate;
    this.term = term;
    this.simulate = simulateEqualRepayment(this.amount, this.interestRate, this.term)
  }

  /**
   * 総額の支払い額を計算します。
   * @returns {number} 
   */
  public calculateTotalPaymentAmount(): number
  {
    return [...Array(this.term)].map((_, i) => i + 1)
        .map<number>(year => this.calculatePaymentAmountForYear(year))
        .reduce<number>((acc, curr) => acc + curr, 0);
  }

  /**
   * 指定された年度の年間支払額（元利均等返済）を計算します。
   * @param year - 計算対象の年度（1年目からterm年目まで）
   * @returns {number} その年度の年間支払額。借入期間外の場合は0を返します。
   */
  public calculatePaymentAmountForYear(year: number): number {
    if (year <= 0 || year > this.term) {
      return 0; // 借入期間外
    }

    // 月間金利
    const monthlyInterestRate = this.interestRate / 12;
    // 支払回数（月数）
    const numberOfPayments = this.term * 12;

    if (monthlyInterestRate === 0) { // 金利0の場合
        return this.amount / this.term;
    }

    // 毎月の返済額
    const monthlyPayment =
      (this.amount *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

    // 年間支払額
    const annualPayment = monthlyPayment * 12;

    // 最終年の調整: 最終年の支払いが借入期間を超えないように、残債を超えないように調整
    // ただし、この簡易計算では毎年の返済額は一定とするため、厳密な最終年調整は行わない
    // より正確な計算が必要な場合は、毎年の残高を追跡する必要がある
    return Math.round(annualPayment);
  }

  /**
   * 指定された年度の年間利息支払額を計算します。
   * @param year - 計算対象の年度（1年目からterm年目まで）
   * @returns {number} その年度の年間利息支払額。借入期間外の場合は0を返します。
   */
  public calculateInterestPaymentForYear(year: number): number {
    if (year <= 0 || year > this.term) {
      return 0;
    }

    let remainingBalance = this.amount;
    let annualInterestPayment = 0;
    const monthlyInterestRate = this.interestRate / 12;
    const numberOfPayments = this.term * 12;

    if (monthlyInterestRate === 0) {
        return 0; // 金利0の場合は利息も0
    }

    const monthlyPayment =
      (this.amount *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

    for (let y = 1; y <= year; y++) {
      let yearlyInterest = 0;
      for (let m = 1; m <= 12; m++) {
        const interestForMonth = remainingBalance * monthlyInterestRate;
        yearlyInterest += interestForMonth;
        const principalForMonth = monthlyPayment - interestForMonth;
        remainingBalance -= principalForMonth;
        if (remainingBalance < 0) remainingBalance = 0;
      }
      if (y === year) {
        annualInterestPayment = yearlyInterest;
      }
    }
    return Math.round(annualInterestPayment);
  }

   /**
   * 指定された年度の年間元金返済額を計算します。
   * @param year - 計算対象の年度（1年目からterm年目まで）
   * @returns {number} その年度の年間元金返済額。借入期間外の場合は0を返します。
   */
  public calculatePrincipalPaymentForYear(year: number): number {
    if (year <= 0 || year > this.term) {
        return 0;
    }
    const annualPayment = this.calculatePaymentAmountForYear(year);
    const interestPayment = this.calculateInterestPaymentForYear(year);
    return annualPayment - interestPayment;
  }
}
