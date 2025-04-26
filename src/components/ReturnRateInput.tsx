// src/components/inputs/ReturnRateInput.tsx
"use client";

import {useSimulationStore} from "@/store/usePropertyStore";
import {ChangeEvent} from "react";

/**
 * 表面利回り
 * @constructor
 */
export const ReturnRateInput = () => {
    const { data, setData } = useSimulationStore();

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const value = Number(e.target.value);
        if (!isNaN(value)) {
            setData({ returnRate: value});
        }
    };

    return (
        <div>
            <label>表面利回り（%）</label>
            <input
                type="number"
                value={data.returnRate}
                onChange={handleChange}
            />
        </div>
    );
};
