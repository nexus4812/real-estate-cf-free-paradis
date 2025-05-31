import { Property } from './property';
import { RC, Wood } from './buildingStructure';

describe('Property', () => {
  let property: Property;

  beforeEach(() => {
    const buildingStructure = new RC(); // RCのインスタンスを使用
    property = new Property(1000000, 2000000, buildingStructure, 10, 100);
  });

  test('価格は土地と建物の合算値であること', () => {
    expect(property.getPrice()).toBe(3000000);
  });

  test('初期費用の値が正しいこと', () => {
    expect(property.estimateInitialCosts()).toBe(240000);
  });

  test('減価償却までの年数を計算できること', () => {
    const yearsToDepreciation = property.calculateYearsToDepreciation();
    expect(yearsToDepreciation).toBe(37);
  });

  test('建物価格1000万、築年数5年、経過年数0年のときの固定資産税を正しく計算する', () => {
    const property = new Property(5000000, 10000000, new Wood(), 5, 100);
    const result = property.estimateFixedAssetTaxForYear(0);

    const expected = 10000000 * ((22 - 5) / 22) * 0.014;
    expect(result).toBeCloseTo(expected, 2);
  });

  test('残耐用年数が1年以下になった場合でも、最低1年分の課税が行われる', () => {
    const property = new Property(5000000, 10000000, new Wood(), 21, 100);
    const result = property.estimateFixedAssetTaxForYear(5); // 築年数21 + 経過年数5 = 26年経過 → 超過

    const expected = 10000000 * (1 / 22) * 0.014;
    expect(result).toBeCloseTo(expected, 2);
  });

  test('経過年数がデフォルト（0年）のときでも計算できる', () => {
    const property = new Property(2000000, 8000000, new Wood(), 3, 80);
    const result = property.estimateFixedAssetTaxForYear();

    const expected = 8000000 * ((22 - 3) / 22) * 0.014;
    expect(result).toBeCloseTo(expected, 2);
  });
});
