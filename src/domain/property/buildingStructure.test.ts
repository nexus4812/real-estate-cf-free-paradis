import { BuildingStructure, RC, SRC, Steel, Wood } from './buildingStructure';

describe('BuildingStructure Tests', () => {
  let rc: RC;
  let src: SRC;
  let steel: Steel;
  let wood: Wood;

  beforeEach(() => {
    rc = new RC();
    src = new SRC();
    steel = new Steel();
    wood = new Wood();
  });

  test('RCの法定耐用年数を取得する', () => {
    expect(rc.getDepreciationYears()).toBe(47);
  });

  test('SRCの法定耐用年数を取得する', () => {
    expect(src.getDepreciationYears()).toBe(47);
  });

  test('Steelの法定耐用年数を取得する', () => {
    expect(steel.getDepreciationYears()).toBe(34);
  });

  test('Woodの法定耐用年数を取得する', () => {
    expect(wood.getDepreciationYears()).toBe(22);
  });

  test('RCの日本語名を取得する', () => {
    expect(rc.label()).toBe('鉄筋コンクリート造');
  });

  test('SRCの日本語名を取得する', () => {
    expect(src.label()).toBe('鉄骨鉄筋コンクリート造');
  });

  test('Steelの日本語名を取得する', () => {
    expect(steel.label()).toBe('鉄骨造');
  });

  test('Woodの日本語名を取得する', () => {
    expect(wood.label()).toBe('木造');
  });

  test('RCの残存耐用年数を計算する', () => {
    expect(rc.calculateRemainingUsefulLifeForYear(10)).toBe(37);
    expect(rc.calculateRemainingUsefulLifeForYear(47)).toBe(0);
  });

  test('SRCの残存耐用年数を計算する', () => {
    expect(src.calculateRemainingUsefulLifeForYear(10)).toBe(37);
    expect(src.calculateRemainingUsefulLifeForYear(47)).toBe(0);
  });

  test('Steelの残存耐用年数を計算する', () => {
    expect(steel.calculateRemainingUsefulLifeForYear(10)).toBe(24);
    expect(steel.calculateRemainingUsefulLifeForYear(34)).toBe(0);
  });

  test('Woodの残存耐用年数を計算する', () => {
    expect(wood.calculateRemainingUsefulLifeForYear(10)).toBe(12);
    expect(wood.calculateRemainingUsefulLifeForYear(22)).toBe(0);
  });
});
