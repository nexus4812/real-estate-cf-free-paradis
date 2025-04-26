'use client';
import React, { useState } from 'react';
import PropertyPriceInput from '@/components/PropertyPriceInput';
import {ReturnRateInput} from "@/components/ReturnRateInput";

type SimulationData = {
    propertyPrice: number;
    returnRate: number;
    structure: string;
    age: number;
    area: number;
    selfFunds: number;
    interestRate: number;
    loanTerm: number;
    occupancyRate: number;
    annualIncome: number;
    rentIncreaseRate: string;
    annualCost: number;
};

const PropertySimulation = () => {
    // State to store simulation inputs
    const [data, setData] = useState<SimulationData>({
        propertyPrice: 0,
        returnRate: 0,
        structure: 'RC',
        age: 0,
        area: 0,
        selfFunds: 0,
        interestRate: 2,
        loanTerm: 20,
        occupancyRate: 90,
        annualIncome: 0,
        rentIncreaseRate: '-1%',
        annualCost: 62.2,
    });

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Calculate simulation result (simple example)
    const calculateSimulation = () => {
        const { propertyPrice, returnRate, selfFunds, interestRate, loanTerm, annualIncome, annualCost } = data;
        const loanAmount = propertyPrice + annualIncome - selfFunds; // Simplified formula
        const monthlyPayment = loanAmount * (interestRate / 100) / 12 * loanTerm; // Simplified loan formula
        return monthlyPayment;
    };

    return (
        <div>
            <h2>不動産投資シミュレーション</h2>
            <div>
                <h3>物件情報</h3>
                <PropertyPriceInput />
                <ReturnRateInput />
                <label>物件構造:</label>
                <select name="structure" value={data.structure} onChange={handleInputChange}>
                    <option value="RC">RC造</option>
                    <option value="SRC">SRC造</option>
                    <option value="Steel">鉄骨造</option>
                    <option value="Wood">木造</option>
                </select>
                <label>築年数 (年):</label>
                <input
                    type="number"
                    name="age"
                    value={data.age}
                    onChange={handleInputChange}
                />
                <label>建物面積 (㎡):</label>
                <input
                    type="number"
                    name="area"
                    value={data.area}
                    onChange={handleInputChange}
                />
            </div>

            <div>
                <h3>融資条件</h3>
                <label>自己資金 (万円):</label>
                <input
                    type="number"
                    name="selfFunds"
                    value={data.selfFunds}
                    onChange={handleInputChange}
                />
                <label>金利 (%):</label>
                <input
                    type="number"
                    name="interestRate"
                    value={data.interestRate}
                    onChange={handleInputChange}
                />
                <label>ローン期間 (年):</label>
                <input
                    type="number"
                    name="loanTerm"
                    value={data.loanTerm}
                    onChange={handleInputChange}
                />
            </div>

            <div>
                <h3>収入条件</h3>
                <label>年間収入 (万円):</label>
                <input
                    type="number"
                    name="annualIncome"
                    value={data.annualIncome}
                    onChange={handleInputChange}
                />
                <label>家賃増減率 (%/年):</label>
                <select name="rentIncreaseRate" value={data.rentIncreaseRate} onChange={handleInputChange}>
                    <option>-5%</option>
                    <option>-4.5%</option>
                    <option>-4%</option>
                    {/* Add more options as needed */}
                </select>
            </div>

            <div>
                <h3>支出条件</h3>
                <label>年間経費 (万円):</label>
                <input
                    type="number"
                    name="annualCost"
                    value={data.annualCost}
                    onChange={handleInputChange}
                />
            </div>

            <div>
                <h3>シミュレーション結果</h3>
                <p>月々の返済額: {calculateSimulation()} 円</p>
            </div>

            <button onClick={calculateSimulation}>シミュレーションする</button>
        </div>
    );
};

export default PropertySimulation;
