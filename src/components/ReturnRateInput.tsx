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
                    type="number"
                    value={data.returnRate}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="表面利回りを入力"
                    min="0"
                    step="0.1"
                />
                <span className="input-addon">%</span>
            </div>
        </div>
    );
};
