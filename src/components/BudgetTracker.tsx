import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { saveUserData, getUserData } from "../lib/firestore";

interface Budget {
  category: string;
  limit: number;
  spent: number;
}

const defaultBudgets: Budget[] = [
  { category: "Food", limit: 500, spent: 320 },
  { category: "Transport", limit: 300, spent: 150 },
  { category: "Entertainment", limit: 200, spent: 180 },
];

export default function BudgetTracker() {
  const [budgets, setBudgets] = useState<Budget[]>(defaultBudgets);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.email) {
      getUserData(session.user.email, "budgets").then((data) => {
        if (data) setBudgets(data);
        setLoading(false);
      });
    } else {
      const raw = localStorage.getItem("mt_budgets");
      if (raw) {
        try {
          setBudgets(JSON.parse(raw));
        } catch {}
      }
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    if (!loading) {
      if (session?.user?.email) {
        saveUserData(session.user.email, "budgets", budgets);
      } else {
        localStorage.setItem("mt_budgets", JSON.stringify(budgets));
      }
    }
  }, [budgets, session, loading]);

  const updateSpent = (index: number, spent: number) => {
    setBudgets((prev) => prev.map((b, i) => i === index ? { ...b, spent } : b));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-gray-950 rounded-xl p-6 shadow flex flex-col gap-4"
    >
      <span className="text-lg font-semibold text-orange-700 dark:text-orange-300">Budget Tracker</span>
      {loading ? (
        <div className="text-gray-500">Loading...</div>
      ) : (
        <ul className="flex flex-col gap-3">
          {budgets.map((budget, index) => {
            const percent = (budget.spent / budget.limit) * 100;
            const over = percent > 100;
            return (
              <li key={budget.category} className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700 dark:text-gray-200">{budget.category}</span>
                  <span className={`text-sm ${over ? 'text-red-600' : 'text-green-600'}`}>
                    ${budget.spent} / ${budget.limit}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${over ? 'bg-red-500' : 'bg-green-500'}`}
                    style={{ width: `${Math.min(percent, 100)}%` }}
                  ></div>
                </div>
                <input
                  type="number"
                  value={budget.spent}
                  onChange={(e) => updateSpent(index, Number(e.target.value))}
                  className="w-full rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-2 text-sm"
                  placeholder="Update spent"
                />
              </li>
            );
          })}
        </ul>
      )}
    </motion.div>
  );
}
