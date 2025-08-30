"use client";
import { useEffect, useState } from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

const mockData = [
  { name: "Apr", spend: 900 },
  { name: "May", spend: 820 },
  { name: "Jun", spend: 970 },
  { name: "Jul", spend: 880 },
  { name: "Aug", spend: 1020 },
  { name: "Sep", spend: 760 },
];

export default function SpendingChart() {
  const [data, setData] = useState(mockData);

  useEffect(() => {
    const raw = localStorage.getItem("mt_transactions");
    if (raw) {
      try {
        const txs = JSON.parse(raw);
        const monthly: Record<string, number> = {};
        for (const t of txs) {
          const month = new Date(t.date).toLocaleString('default', { month: 'short' });
          monthly[month] = (monthly[month] || 0) + Math.abs(t.amount);
        }
        const chartData = Object.entries(monthly).map(([name, spend]) => ({ name, spend: Math.round(spend) }));
        if (chartData.length) setData(chartData);
      } catch {}
    }
  }, []);

  return (
    <div className="w-full h-56 bg-white dark:bg-gray-900 rounded-xl shadow p-4">
      <div className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">Spending (last 6 months)</div>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip contentStyle={{ background: "#0f172a", color: "#e2e8f0", border: "none" }} />
          <Area type="monotone" dataKey="spend" stroke="#14b8a6" fillOpacity={1} fill="url(#colorSpend)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
