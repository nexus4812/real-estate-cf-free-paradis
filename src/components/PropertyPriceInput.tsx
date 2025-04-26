'use client';

import { useSimulationStore } from '@/store/usePropertyStore';
import { ChangeEvent } from 'react';

/**
 * 物件価格
 * @constructor
 */
export default function PropertyPriceInput() {
    const { data, setData } = useSimulationStore();

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const value = Number(e.target.value);
        if (!isNaN(value)) {
            setData({ propertyPrice: value});
        }
    };

    return (
        <div>
            <label htmlFor="propertyPrice">物件価格</label>
            <input
                id="propertyPrice"
                type="number"
                value={data.propertyPrice}
                onChange={handleChange}
                placeholder="物件価格を入力"
            />万円
        </div>
    );
}
