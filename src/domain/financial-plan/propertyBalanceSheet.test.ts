import { PropertyBalanceSheet } from './propertyBalanceSheet';
import { Property } from '../property/property';
import { PropertyIncome } from '../propertyIncome/propertyIncome'; 
import { PropertyCost } from '../propertyCost/propertyCost';
import { Wood } from '../property/buildingStructure';

describe('PropertyBalanceSheet', () => {
  let property: Property;
  let income: PropertyIncome;
  let cost: PropertyCost;
  let balanceSheet: PropertyBalanceSheet;
  let price: number; // 価格をここで定義
  let annualBalance: number; // 年間収支をここで定義

  beforeEach(() => {
    const landPrice = 1800 * 10000; // 1800万
    const buildingPrice = 2800 * 10000; // 2800万
    price = landPrice + buildingPrice;

    // Property クラスのインスタンスを作成
    property = new Property(
      1000000,
      2000000,
      new Wood(),
      35,
      160
    );

    // PropertyIncome クラスのインスタンスを作成
    income = new PropertyIncome(property, 0.05, 0.02, 0.1); // 例として引数を指定

    // PropertyCost クラスのインスタンスを作成
    cost = new PropertyCost(price, 300000, 0.05, 0.02); // 例として引数を指定

    // PropertyBalanceSheet クラスのインスタンスを作成
    balanceSheet = new PropertyBalanceSheet(property, income, cost);
  });

  test('1年目の年間収支を正しく計算する', () => {
    const expectedAnnualBalance = income.calculateAnnualIncome(1) - cost.calculateAnnualCosts(1);
    annualBalance = balanceSheet.calculateAnnualBalanceForYear(1);
    expect(annualBalance).toBe(expectedAnnualBalance);
  });

  test('1年目の表面利回りを正しく計算する', () => {
    const expectedGrossYield = income.calculatePotentialAnnualRent(1) / property.getPrice();
    const grossYield = balanceSheet.calculateGrossYieldForYear(1);
    expect(grossYield).toBe(expectedGrossYield);
  });

  test('1年目の実質利回りを正しく計算する', () => {
    const expectedRealYield = (annualBalance / (property.getPrice() + property.estimateInitialCosts()));
    const realYield = balanceSheet.calculateRealYieldForYear(1);
    expect(realYield).toBe(expectedRealYield);
  });

  // test('1年目の税引前キャッシュフローを正しく計算する', () => {
  //   const expectedPreTaxCashFlow = income.calculateAnnualIncome(1) - cost.calculateAnnualCosts(1);
  //   const preTaxCashFlow = balanceSheet.calculatePreTaxCashFlowForYear(1);
  //   expect(preTaxCashFlow).toBe(expectedPreTaxCashFlow);
  // });

  // test('1年目の課税所得を正しく計算する', () => {
  //   const expectedTaxableIncome = expectedAnnualBalance - cost.calculateRealAnnualManagementFee();
  //   const taxableIncome = balanceSheet.calculateTaxableIncomeForYear(1);
  //   expect(taxableIncome).toBe(expectedTaxableIncome);
  // });

  // // 2年目のテスト
  // test('2年目の年間収支を正しく計算する', () => {
  //   const expectedAnnualBalance = income.calculateAnnualIncome(2) - cost.calculateAnnualCosts(2);
  //   annualBalance = balanceSheet.calculateAnnualBalanceForYear(2);
  //   expect(annualBalance).toBe(expectedAnnualBalance);
  // });

  // test('2年目の表面利回りを正しく計算する', () => {
  //   const expectedGrossYield = income.calculatePotentialAnnualRent(2) / property.getPrice();
  //   const grossYield = balanceSheet.calculateGrossYieldForYear(2);
  //   expect(grossYield).toBe(expectedGrossYield);
  // });

  // test('2年目の実質利回りを正しく計算する', () => {
  //   const expectedRealYield = (annualBalance / (property.getPrice() + property.estimateInitialCosts()));
  //   const realYield = balanceSheet.calculateRealYieldForYear(2);
  //   expect(realYield).toBe(expectedRealYield);
  // });

  // test('2年目の税引前キャッシュフローを正しく計算する', () => {
  //   const expectedPreTaxCashFlow = income.calculateAnnualIncome(2) - cost.calculateAnnualCosts(2);
  //   const preTaxCashFlow = balanceSheet.calculatePreTaxCashFlowForYear(2);
  //   expect(preTaxCashFlow).toBe(expectedPreTaxCashFlow);
  // });

  // test('2年目の課税所得を正しく計算する', () => {
  //   const expectedTaxableIncome = expectedAnnualBalance - cost.calculateRealAnnualManagementFee();
  //   const taxableIncome = balanceSheet.calculateTaxableIncomeForYear(2);
  //   expect(taxableIncome).toBe(expectedTaxableIncome);
  // });
});
