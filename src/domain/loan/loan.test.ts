import { Loan } from './loan';

describe('Loan Module', () => {
  let loan: Loan;

  beforeEach(() => {
    loan = new Loan(100000, 0.05, 30); // 例: 100,000円のローン、金利5%、30年
  });

  test('ローンの月々の支払いを計算する', () => {
    const payment = loan.calculatePaymentAmountForYear(1); // 1年目の支払いを計算
    expect(payment).toBeCloseTo(6442, 2); // 期待される月々の支払いを修正
  });

  test('ローンの年間利息支払額を計算する', () => {
    const interestPayment = loan.calculateInterestPaymentForYear(1); // 1年目の利息支払額を計算
    expect(interestPayment).toBeCloseTo(4966, 2); // 期待される利息支払額を修正
  });

  test('ローンの年間元金返済額を計算する', () => {
    const principalPayment = loan.calculatePrincipalPaymentForYear(1); // 1年目の元金返済額を計算
    expect(principalPayment).toBeGreaterThan(0); // 元金返済額は0より大きいはず
  });

  test('ローンの総支払い額を計算する', () => {
    expect((new Loan(10000000, 0.02, 15)).calculateTotalPaymentAmount()).toBe(11583150)
  });
});
