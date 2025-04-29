"use client";

import {useSimulationStore} from "@/store/usePropertyStore";
import {useEffect} from "react";
import {useForm} from "react-hook-form";

type FormValues = {
    returnRate: number;
};

/**
 * 表面利回り
 * @constructor
 */
export const ReturnRateInput = () => {
    const { simulation, setData } = useSimulationStore();
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch
    } = useForm<FormValues>({
        mode: "onChange",
        defaultValues: {
            returnRate: simulation.props.returnRate
        }
    });

    // 値が変更されたときにストアを更新
    const returnRateValue = watch("returnRate");
    useEffect(() => {
        if (!isNaN(returnRateValue)) {
            setData({ returnRate: Number(returnRateValue) });
        }
    }, [returnRateValue, setData]);

    // ストアの値が外部から変更された場合にフォームの値を更新
    useEffect(() => {
        setValue("returnRate", simulation.props.returnRate);
    }, [simulation.props.returnRate, setValue]);

    return (
        <div className="mb-4">
            <label
                htmlFor="returnRate"
                className="input-label flex items-center"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                </svg>
                表面利回り:
            </label>
            <div className="input-group">
                <input
                    id="returnRate"
                    {...register("returnRate", {
                        required: "表面利回りは必須です",
                        valueAsNumber: true,
                        min: {
                            value: 0,
                            message: "表面利回りは0%以上で入力してください"
                        },
                        max: {
                            value: 100,
                            message: "表面利回りは300%以下で入力してください"
                        },
                        validate: {
                            isNumber: value => !isNaN(Number(value)) || "数値を入力してください"
                        }
                    })}
                    className={`input-field ${errors.returnRate ? "border-red-500" : ""}`}
                    placeholder="表面利回りを入力"
                    min="0"
                    step="0.1"
                    type="number"
                />
                <span className="input-addon">%</span>
            </div>
            {errors.returnRate && (
                <p className="text-red-500 text-sm mt-1">{errors.returnRate.message}</p>
            )}
        </div>
    );
};
