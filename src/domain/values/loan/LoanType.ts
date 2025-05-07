import {EqualPaymentStrategy} from '@/domain/values/loan/strategy/EqualPaymentStrategy'
import {LoanCalculationStrategy} from '@/domain/values/loan/strategy/LoanCalculationStrategy'

const ROAN_TYPE = ["EqualPayment", "EqualPrincipalPayment"] as const;
type LoanTypeList = typeof ROAN_TYPE[number];

const LOAN_TYPE_MAP: Record<LoanTypeList, string> = {
    EqualPayment: "元利均等返済",
    EqualPrincipalPayment: "元金均等返済",
};

export class LoanType {
  private constructor(private readonly type: LoanTypeList) {}

  public static create(type: string): LoanType {
    if (!LoanType.isValid(type)) {
      throw new Error(`Invalid loan type: ${type}`);
    }
    return new LoanType(type as LoanTypeList);
  }

  public get value(): LoanTypeList {
    return this.type;
  }

  public static isValid(type: string): type is LoanTypeList {
    return ROAN_TYPE.includes(type as any);
  }

  public isEqualPayment(): boolean {
    return this.value === "EqualPayment"
  }

  public getReadableName(): string {
    const value = this.value;
    return LOAN_TYPE_MAP[value as LoanTypeList];
  }

  public static all(): LoanType[] {
    return ROAN_TYPE.map(type => new LoanType(type))
  }
}