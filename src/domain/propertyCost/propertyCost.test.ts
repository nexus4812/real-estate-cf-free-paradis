import { PropertyCost } from './propertyCost';
import { Loan } from './loan';
import { LargeScaleRepairPlan } from './largeScaleRepairPlan';
import { Property } from '../property/property';
import { RC } from '../property/buildingStructure';
import { PropertyIncome } from '../propertyIncome/propertyIncome';

describe('PropertyCost', () => {
  const loan = new Loan(1000000, 0.03, 30); // 例: 100万円、金利3%、30年
  const largeScaleRepairPlans = [
    new LargeScaleRepairPlan(50000, 3), // 3年目に50万円の修繕計画
  ];

  const property = new Property(
    2500000, // 物件価格500万
    2500000,
    new RC(),
    10,
    200,
  );

  const propertyIncome = new PropertyIncome(
    property,
    0.035, // 利回り3.5% 家賃下落率1% 空室率10%
    -0.01,
    0.10
  )

  const propertyCost = new PropertyCost(
    propertyIncome,
    0.05, // 管理費5%
    0.02, // 
    largeScaleRepairPlans, 
    loan
);

  test('固定資産税の計算', () => {
    const tax = propertyCost.calculatePropertyTax(0);
    expect(tax).toBe(Number((2500000 * ((47 - 10) / 47) * 0.014).toFixed(2)));
  });

  test('年間管理費の計算', () => {
    const managementFee = propertyCost.calculateRealAnnualManagementFee();
    expect(managementFee).toBe(30000); // 年間収入60万円の5%
  });

  test('年間修繕費の計算', () => {
    const repairCost = propertyCost.calculateRealRepairCost();
    expect(repairCost).toBe(12000); // 年間収入60万円の2%
  });

  test('大規模修繕の計算', () => {
    expect(propertyCost.getLargeScaleRepairCostForYear(2)).toBe(0);
    expect(propertyCost.getLargeScaleRepairCostForYear(3)).toBe(50000);
    expect(propertyCost.getLargeScaleRepairCostForYear(4)).toBe(0);
  });

  test('年間コストの計算', () => {
    expect(propertyCost.calculateAnnualCosts(1)).toBe(152092);
    expect(propertyCost.calculateAnnualCosts(2)).toBe(152092);
    expect(propertyCost.calculateAnnualCosts(3)).toBe(202092);
    expect(propertyCost.calculateAnnualCosts(4)).toBe(152092);
  });
});
