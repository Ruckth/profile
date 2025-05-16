'use client';

import { useState } from 'react';

interface CalculatorInputs {
  initialInvestment: number;
  monthlyRate: number;
  months: number;
  annualContribution: number;
}

interface CalculationResult {
  finalAmount: number;
  totalInvested: number;
  totalProfit: number;
  profitPerYear: number;
}

export default function CompoundCalculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    initialInvestment: 0,
    monthlyRate: 0,
    months: 0,
    annualContribution: 0,
  });
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculateCompoundInterest = () => {
    const {
      initialInvestment,
      monthlyRate,
      months,
      annualContribution
    } = inputs;

    const monthlyContribution = annualContribution / 12;
    const rate = monthlyRate / 100;
    const years = months / 12;

    let total = initialInvestment;
    let totalInvested = initialInvestment;
    
    for (let i = 0; i < months; i++) {
      total = total * (1 + rate);
      if (i % 12 === 11) {
        total += annualContribution;
        totalInvested += annualContribution;
      }
    }

    const finalAmount = Number(total.toFixed(2));
    const totalProfit = finalAmount - totalInvested;
    const profitPerYear = totalProfit / years;

    setResult({
      finalAmount,
      totalInvested,
      totalProfit,
      profitPerYear
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: Number(value)
    }));
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-pink-950 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Compound Interest Calculator</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">
            Initial Investment ($)
          </label>
          <input
            type="number"
            name="initialInvestment"
            value={inputs.initialInvestment}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Monthly Interest Rate (%)
          </label>
          <input
            type="number"
            name="monthlyRate"
            value={inputs.monthlyRate}
            onChange={handleInputChange}
            step="0.01"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Number of Months
          </label>
          <input
            type="number"
            name="months"
            value={inputs.months}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Annual Contribution ($)
          </label>
          <input
            type="number"
            name="annualContribution"
            value={inputs.annualContribution}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={calculateCompoundInterest}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Calculate
        </button>

        {result && (
          <div className="mt-4 p-4 bg-green-50 rounded-md space-y-2">
            <p className="text-green-700 font-medium">
              Final Amount: ${result.finalAmount.toLocaleString()}
            </p>
            <p className="text-blue-700 font-medium">
              Total Invested: ${result.totalInvested.toLocaleString()}
            </p>
            <p className="text-purple-700 font-medium">
              Total Profit: ${result.totalProfit.toLocaleString()}
            </p>
            <p className="text-indigo-700 font-medium">
              Average Profit per Year: ${result.profitPerYear.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}