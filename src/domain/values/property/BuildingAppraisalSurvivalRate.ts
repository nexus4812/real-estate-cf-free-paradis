import { Age } from "@/domain/values/property/Age";
import { Structure } from "@/domain/values/property/Structure";

/**
 * 
 */
class BuildingAppraisalSurvivalRate {
    constructor(
        public readonly age: Age,
        public readonly structure: Structure,
    ) {}
}