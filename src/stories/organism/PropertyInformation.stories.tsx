import { PropertyInformation } from '@/components/organism/PropertyInformation';
import { useForm } from 'react-hook-form';
import { SimulationInput } from '@/store/usePropertyStore';

export const 物件情報 = () => {
  const {
    register,
    formState: { errors },
  } = useForm<SimulationInput>();
  return <PropertyInformation register={register} errors={errors} />;
};
