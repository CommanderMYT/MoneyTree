import { useState } from "react";
import { motion } from "framer-motion";

export default function FinancialCalculator() {
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(5);
  const [time, setTime] = useState(10);
  const [result, setResult] = useState(0);

  const calculate = () => {
    const r = rate / 100;
    const amount = principal * Math.pow(1 + r, time);
    setResult(amount);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-gray-950 rounded-xl p-6 shadow flex flex-col gap-4"
    >
      <span className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">Investment Calculator</span>
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-600 dark:text-gray-300">Principal ($)</label>
        <input
          type="number"
          value={principal}
          onChange={(e) => setPrincipal(Number(e.target.value))}
          className="rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-2"
        />
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="text-sm text-gray-600 dark:text-gray-300">Rate (%)</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-2"
          />
        </div>
        <div className="flex-1">
          <label className="text-sm text-gray-600 dark:text-gray-300">Years</label>
          <input
            type="number"
            value={time}
            onChange={(e) => setTime(Number(e.target.value))}
            className="w-full rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-2"
          />
        </div>
      </div>
      <button
        onClick={calculate}
        className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition"
      >
        Calculate
      </button>
      {result > 0 && (
        <div className="text-center text-lg font-bold text-indigo-700 dark:text-indigo-300">
          Future Value: ${result.toFixed(2)}
        </div>
      )}
    </motion.div>
  );
}
