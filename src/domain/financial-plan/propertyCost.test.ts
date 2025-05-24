import { PropertyCost } from './propertyCost';
import { Loan } from '../loan/loan';
import { LargeScaleRepairPlan } from './largeScaleRepairPlan';

describe('PropertyCost', () => {
  const loan = new Loan(1000000, 0.03, 30); // 例: 100万円、金利3%、30年
  const largeScaleRepairPlans = [
    new LargeScaleRepairPlan(50000, 3), // 3年目に50万円の修繕計画
  ];
  const propertyCost = new PropertyCost(
    5000000, // 物件価格
    600000,  // 実質賃料
    0.05,
    0.02, 
    largeScaleRepairPlans, 
    loan
);

  test('固定資産税の計算', () => {
    const tax = propertyCost.calculatePropertyTax(0);
    expect(tax).toBe(59500); // 物件価格500万円の70%に対して1.7%の税率
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
