import PropertyPriceInput from '@/components/molecules/PropertyPriceInput';
import { ReturnRateInput } from "@/components/molecules/ReturnRateInput";
import { StructureInput } from "@/components/molecules/StructureInput";
import { AgeInput } from "@/components/molecules/AgeInput";
import { AreaInput } from "@/components/molecules/AreaInput";

export const PropertyInformation = () => (
  <div className="card p-4 mb-8 animate-fade-in">
    <h3 className="section-title flex items-center text-lg mb-3">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
      </svg>
      物件情報
    </h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      <PropertyPriceInput />
      <ReturnRateInput />
      <StructureInput />
      <AgeInput />
      <AreaInput />
    </div>
  </div>
)
