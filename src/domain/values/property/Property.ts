import { PropertyPrice } from "@/domain/values/property/PropertyPrice";
import { Structure } from "@/domain/entities/Structure";
import { Age } from "@/domain/values/property/Age";
import { Area } from "@/domain/values/property/Area";

export class Property {
    constructor(
        public propertyPrice: PropertyPrice,
        public structure: Structure,
        public age: Age,
        public area: Area
    ) {}

    calculateDepreciation(year: number): number {
        // 減価償却の計算ロジックを実装
    }
}
