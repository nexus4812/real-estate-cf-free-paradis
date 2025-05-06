"use client";

import { useSimulationStore } from "@/store/usePropertyStore";
import { useForm, Controller } from "react-hook-form";

type FormValues = {
  returnRate: number;
};

export const ReturnRateInput = () => {
  const { simulation, setData } = useSimulationStore();

  const {
    control,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      returnRate: simulation.props.returnRate,
    },
  });

  return (
    <div className="mb-2">
      <label htmlFor="returnRate" className="input-label flex items-center text-xs mb-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3 mr-1 text-blue-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
            clipRule="evenodd"
          />
        </svg>
        表面利回り:
      </label>

      <div className="input-group">
        <Controller
          name="returnRate"
          control={control}
          rules={{
            required: "表面利回りは必須です",
            min: {
              value: 0,
              message: "表面利回りは0%以上で入力してください",
            },
            max: {
              value: 100,
              message: "表面利回りは100%以下で入力してください",
            },
            validate: {
              isNumber: value =>
                !isNaN(Number(value)) || "0%から300%までの数字を入力してください",
            },
          }}
          render={({ field }) => (
            <input
              {...field}
              className={`input-field py-2 px-3 text-sm ${errors.returnRate ? "border-red-500" : ""}`}
              placeholder="表面利回りを入力"
              onChange={(e) => {
                field.onChange(e.target.value);
                const value = Number(e.target.value);
                if (!isNaN(value)) {
                  setData({ returnRate: value });
                }
              }}
            />
          )}
        />
        <span className="input-addon text-xs">%</span>
      </div>

      <p className="text-xs mt-0.5 min-h-[1.25rem] text-red-500">
        {errors.returnRate?.message ?? "\u00A0" /* &nbsp;で領域を確保し、エラー時におけるズレを軽減する */}
      </p>
    </div>
  );
};
