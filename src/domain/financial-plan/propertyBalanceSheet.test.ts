import { PropertyBalanceSheet } from './propertyBalanceSheet';
import { Property } from '../property/property';
import { PropertyIncome } from './propertyIncome'; 
import { PropertyCost } from './propertyCost';
import { Wood } from '../property/buildingStructure';

describe('PropertyBalanceSheet', () => {
  let property: Property;
  let income: PropertyIncome;
  let cost: PropertyCost;
  let balanceSheet: PropertyBalanceSheet;

  beforeEach(() => {
    const landPrice = 1800 * 10000; // 1800万
    const buildingPrice = 2800 * 10000; // 2800万
    const price = landPrice + buildingPrice;

    // Property クラスのインスタンスを作成
    property = new Property(
      1000000,
      2000000,
      new Wood(),
      35,
      160
    );

    // PropertyIncome クラスのインスタンスを作成
    income = new PropertyIncome(price, 0.05, 0.02, 0.1); // 例として引数を指定

    // PropertyCost クラスのインスタンスを作成
    cost = new PropertyCost(price, 300000, 0.05, 0.02); // 例として引数を指定

    // PropertyBalanceSheet クラスのインスタンスを作成
    balanceSheet = new PropertyBalanceSheet(property, income, cost);
  });

  test('should calculate annual balance for year correctly', () => {
    const annualBalance = balanceSheet.calculateAnnualBalanceForYear(1);
    expect(annualBalance).toBe(300000 - (cost.calculateRealAnnualManagementFee() + cost.calculateRealRepairCost() + cost.calculatePropertyTax(1))); // 期待される年間収支を計算
  });

  test('should calculate gross yield for year correctly', () => {
    const grossYield = balanceSheet.calculateGrossYieldForYear(1);
    expect(grossYield).toBe(0.05); // 期待される表面利回り
  });

  test('should calculate real yield for year correctly', () => {
    const realYield = balanceSheet.calculateRealYieldForYear(1);
    expect(realYield).toBe(/* 期待される実質利回り */);
  });

  test('should calculate pre-tax cash flow for year correctly', () => {
    const preTaxCashFlow = balanceSheet.calculatePreTaxCashFlowForYear(1);
    expect(preTaxCashFlow).toBe(300000 - (cost.calculateRealAnnualManagementFee() + cost.calculateRealRepairCost())); // 期待される税引前キャッシュフロー
  });

  test('should calculate taxable income for year correctly', () => {
    const taxableIncome = balanceSheet.calculateTaxableIncomeForYear(1);
    expect(taxableIncome).toBe(/* 期待される課税所得 */);
  });
});
