import { Wood } from '../property/buildingStructure';
import { Property } from '../property/property';
import { PropertyIncome } from './propertyIncome';

describe('PropertyIncome', () => {
  let propertyIncome: PropertyIncome;
  let property: Property;

  beforeEach(() => {
    const property = new Property(
      0, // 土地価格はテストに影響しないため0とする
      10000000, // 建物価格を1000万に修正
      new Wood(),
      33,
      200
    );

    propertyIncome = new PropertyIncome(
      property,
      0.05, // 表面利回り
      -0.01, // 家賃増減率
      0.1 // 空室率
    );
  });

  test('コンストラクタのテスト', () => {
    expect(
      () =>
        new PropertyIncome(
          new Property(
            0,
            10000000, // 建物価格を1000万に修正
            new Wood(),
            33,
            200
          ),
          -0.05,
          0.1,
          0.1
        )
    ).toThrow('初期年間家賃収入は0以上の値を入力してください。');
  });

  test('家賃下落率を除いた、指定年度の想定家賃収入が正しい値であること', () => {
    expect(propertyIncome.calculatePotentialAnnualRent(0)).toBe(0);
    // 初期家賃: 1000万 * 5% = 50万
    // 1年目: 50万 * (1 - 1%)^1 = 49.5万
    // 2年目: 50万 * (1 - 1%)^2 = 49.005万 -> Math.roundで490050
    // 3年目: 50万 * (1 - 1%)^3 = 48.51495万 -> Math.roundで485150
    // 20年目: 50万 * (1 - 1%)^20 = 408953.46... -> Math.roundで408953
    expect(propertyIncome.calculatePotentialAnnualRent(1)).toBe(495000);
    expect(propertyIncome.calculatePotentialAnnualRent(2)).toBe(490050);
    expect(propertyIncome.calculatePotentialAnnualRent(3)).toBe(485150);
    expect(propertyIncome.calculatePotentialAnnualRent(20)).toBe(408953); // 期待値を修正
  });

  test('指定年度の想定家賃収入が正しい値であること', () => {
    expect(propertyIncome.calculateAnnualIncome(0)).toBe(0);
    // 1年目: 495000 * (1 - 10%) = 445500
    // 2年目: 490050 * (1 - 10%) = 441045
    // 3年目: 485150 * (1 - 10%) = 436635
    // 20年目: 408953 * (1 - 10%) = 368057.7 -> Math.roundで368058
    expect(propertyIncome.calculateAnnualIncome(1)).toBe(445500);
    expect(propertyIncome.calculateAnnualIncome(2)).toBe(441045);
    expect(propertyIncome.calculateAnnualIncome(3)).toBe(436635);
    expect(propertyIncome.calculateAnnualIncome(20)).toBe(368058); // 期待値を修正
  });
});
