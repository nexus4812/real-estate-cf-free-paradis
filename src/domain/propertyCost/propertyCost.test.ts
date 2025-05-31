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
    const tax = propertyCost.calculatePropertyTax(0); // year 0 は property.ts で year 1 として扱われる
    // property.ts の estimateFixedAssetTaxForYear のロジックに合わせる
    // totalDurableYears = 47, constructionYear = 10, year = 0 (effectiveYear = 1)
    // remainingYears = max(47 - 10 - 0, 1) = 37
    // expectedTax = Number((2500000 * (37 / 47) * 0.014).toFixed(2)) = 27553.19
    expect(tax).toBe(27553.19);
  });

  test('年間管理費の計算', () => {
    const managementFee = propertyCost.calculateRealAnnualManagementFee();
    expect(managementFee).toBe(7796); // 修正後の期待値: 155925 * 0.05 = 7796.25 -> 7796
  });

  test('年間修繕費の計算', () => {
    const repairCost = propertyCost.calculateRealRepairCost();
    expect(repairCost).toBe(3119); // 修正後の期待値: 155925 * 0.02 = 3118.5 -> 3119
  });

  test('大規模修繕の計算', () => {
    expect(propertyCost.getLargeScaleRepairCostForYear(2)).toBe(0);
    expect(propertyCost.getLargeScaleRepairCostForYear(3)).toBe(50000);
    expect(propertyCost.getLargeScaleRepairCostForYear(4)).toBe(0);
  });

  test('年間コストの計算', () => {
    // 1年目: 管理費(7796) + 修繕費(3119) + 固定資産税(26808.51) + ローン(50592) + 大規模修繕(0) = 88315.51 -> 88316
    expect(propertyCost.calculateAnnualCosts(1)).toBe(88316);
    // 2年目: 管理費(7796) + 修繕費(3119) + 固定資産税(26063.83) + ローン(50592) + 大規模修繕(0) = 87570.83 -> 87571
    expect(propertyCost.calculateAnnualCosts(2)).toBe(87571);
    // 3年目: 管理費(7796) + 修繕費(3119) + 固定資産税(25319.15) + ローン(50592) + 大規模修繕(50000) = 136826.15 -> 136826
    expect(propertyCost.calculateAnnualCosts(3)).toBe(136826);
    // 4年目: 管理費(7796) + 修繕費(3119) + 固定資産税(24574.47) + ローン(50592) + 大規模修繕(0) = 86081.47 -> 86081
    expect(propertyCost.calculateAnnualCosts(4)).toBe(86081);
  });
});
