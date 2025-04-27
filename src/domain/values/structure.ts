const STRUCTURES = ["RC", "SRC", "Steel", "Wood"] as const;
export type StructureType = typeof STRUCTURES[number];

export class Structure {
  private constructor(private readonly type: StructureType) {}

  public static create(type: string): Structure {
    if (!Structure.isValid(type)) {
      throw new Error(`Invalid structure type: ${type}`);
    }
    return new Structure(type as StructureType);
  }

  public get value(): StructureType {
    return this.type;
  }

  public static isValid(type: string): type is StructureType {
    return STRUCTURES.includes(type as any);
  }

  /**
   * 減価償却年数を返す
   */
  getDepreciationYears(): number {
    switch (this.type) {
      case 'RC':
      case 'SRC':
        return 47;
      case 'Steel':
        return 34;
      case 'Wood':
        return 22;
      default:
        throw new Error('Unknown structure type');
    }
  }
}
