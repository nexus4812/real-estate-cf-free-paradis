import { PropertyPrice } from "@/domain/values/property/PropertyPrice";
import { Age } from "@/domain/values/property/Age";
import { Area } from "@/domain/values/property/Area";
import { Structure } from "@/domain/values/property/Structure";

// （概算値）土地の価格の割合（0.6〜0.8程度）
const landRatio = 0.7;

// （概算値）土地評価係数（住宅用地特例を反映したざっくり値）
const LAND_EVAL_RATIO = 0.2;

// （概算値）建物評価係数（再建築価格に対する概算評価割合）
const BUILDING_EVAL_COEFFICIENT = 0.7;

// 固定資産税率（全国共通の標準税率）
const FIXED_ASSET_TAX_RATE = 0.014;

export class Property {
    constructor(
        public readonly propertyPrice: PropertyPrice,
        public readonly structure: Structure,
        public readonly age: Age,
        public readonly area: Area
    ) {}

    public calculateRemainingYears(): number {
        const result = this.structure.getDepreciationYears() - this.age.years;
        return result < 0 ? 0 : result;
    }

    public getBuildingAppraisalSurvivalRate(): number {
        const rate = this.calculateRemainingYears() / this.structure.getDepreciationYears();
        return rate <= 0 ? 0.1 : rate;
    }

    /**
     * 概算の土地価格
     */
    public getApproximateLandPrice(): number {
        return this.propertyPrice.amount * landRatio;
    }

    /**
     * 概算の建物価格
     */
    public getApproximateBuildingPrice(): number {
        return this.propertyPrice.amount * (1 - landRatio);
    }

    /**
     * 概算の固定資産税評価額
     */
    public getApproximateAppraisedValue(): number {
        const landValue = this.getApproximateLandPrice() * LAND_EVAL_RATIO;
        const buildingValue = this.getApproximateBuildingPrice() * this.getBuildingAppraisalSurvivalRate() * BUILDING_EVAL_COEFFICIENT;
        return landValue + buildingValue;
    }

    /**
     * 概算の固定資産税額
     */
    public getApproximateFixedAssetTax(): number {
        return this.getApproximateAppraisedValue() * FIXED_ASSET_TAX_RATE;
    }
}
