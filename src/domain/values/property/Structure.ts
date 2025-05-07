const STRUCTURES = ["RC", "SRC", "Steel", "Wood"] as const;
export type StructureType = typeof STRUCTURES[number];

const STRUCTURE_NAME_MAP: Record<StructureType, string> = {
    RC: "RC造",
    SRC: "SRC造",
    Steel: "鉄骨造",
    Wood: "木造",
  };

const STRUCTURE_DEPRECIATION_YEARS_MAP: Record<StructureType, number> = {
    RC: 47,
    SRC: 47,
    Steel: 34,
    Wood: 22,
};

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

  public getReadableName(): string {
    const value = this.value;
    return STRUCTURE_NAME_MAP[value as StructureType];
  }

  public static all(): Structure[] {
    return STRUCTURES.map(structure => new Structure(structure))
  }

  /**
   * 減価償却年数を返す
   */
  getDepreciationYears(): number {
    const value = this.value;
    return STRUCTURE_DEPRECIATION_YEARS_MAP[value as StructureType];
  }
}
