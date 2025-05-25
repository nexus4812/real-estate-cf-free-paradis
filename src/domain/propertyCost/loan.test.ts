import { Loan } from './loan';

describe('Loan Module', () => {
  let loan: Loan;

  test('1000万円のローン、金利5%、期間が35年のとき、支払い総額が正しいこと', () => {
    loan = new Loan(10000, 0.05, 1);
    expect(loan.calculateTotalPaymentAmount()).toBe(10272);
  });

  test('3800万円のローン、金利2%、期間が35年のとき、支払い総額が正しいこと', () => {
    loan = new Loan(38000000, 0.02, 35);
    expect(loan.calculateTotalPaymentAmount()).toBe(52869600);
  });

  test('1000万円のローン、金利2%、期間が15年のとき、支払い総額が正しいこと', () => {
    loan = new Loan(10000000, 0.03, 15);
    expect(loan.calculateTotalPaymentAmount()).toBe(12430440);
  });
});
