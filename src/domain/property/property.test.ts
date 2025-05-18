import { Property } from './property';
import { RC } from './buildingStructure';

describe('Property', () => {
  let property: Property;

  beforeEach(() => {
    const buildingStructure = new RC(); // RCのインスタンスを使用
    property = new Property(1000000, 2000000, buildingStructure, 10, 100);
  });

  test('価格は土地と建物の合算値であること', () => {
    expect(property.getPrice()).toBe(3000000);
  });

  test('estimateInitialCosts should return approximately 8% of the total price', () => {
    expect(property.estimateInitialCosts()).toBe(240000);
  });

  test('減価償却までの年数を計算できること', () => {
    const yearsToDepreciation = property.calculateYearsToDepreciation();
    expect(yearsToDepreciation).toBe(37);
  });
});
