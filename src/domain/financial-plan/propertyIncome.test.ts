import { Wood } from '../property/buildingStructure';
import { Property } from '../property/property';
import { PropertyIncome } from './propertyIncome';

describe('PropertyIncome', () => {
  let propertyIncome: PropertyIncome;
  let property: Property

  beforeEach(() => {
    const property = new Property(
      5000000,
      5000000,
      new Wood(),
      33,
      200
    );

    propertyIncome = new PropertyIncome(
      property,  // 物件価格(1000万)
        0.05,      // 表面利回り
        -0.01,     // 家賃増減率
        0.1        // 空室率
    );
  });

  test('コンストラクタのテスト', () => {
    expect(() => new PropertyIncome(new Property(
      5000000,
      5000000,
      new Wood(),
      33,
      200
    ), -0.05, 0.1, 0.1)).toThrow("初期年間家賃収入は0以上の値を入力してください。");
  });

  test('家賃下落率を除いた、指定年度の想定家賃収入が正しい値であること', () => {
    expect(propertyIncome.calculatePotentialAnnualRent(0)).toBe(0);
    expect(propertyIncome.calculatePotentialAnnualRent(1)).toBe(495000); 
    expect(propertyIncome.calculatePotentialAnnualRent(2)).toBe(490000); 
    expect(propertyIncome.calculatePotentialAnnualRent(3)).toBe(485000);
    expect(propertyIncome.calculatePotentialAnnualRent(20)).toBe(400000);
  });

  test('指定年度の想定家賃収入が正しい値であること', () => {
    expect(propertyIncome.calculateAnnualIncome(0)).toBe(0);
    expect(propertyIncome.calculateAnnualIncome(1)).toBe(445500); 
    expect(propertyIncome.calculateAnnualIncome(2)).toBe(441000); 
    expect(propertyIncome.calculateAnnualIncome(3)).toBe(436500);
    expect(propertyIncome.calculateAnnualIncome(20)).toBe(360000);
  });
});
