import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function AIAdvice() {
  const [advice, setAdvice] = useState("Loading advice...");
  const [loading, setLoading] = useState(false);

  const fetchAdvice = async () => {
    setLoading(true);
    try {
      // Build summary from localStorage
      const goals = localStorage.getItem("mt_goals");
      const transactions = localStorage.getItem("mt_transactions");
      const summary = `Goals: ${goals || 'None'}. Recent transactions: ${transactions ? JSON.parse(transactions).slice(0, 5).map((t: any) => `${t.name}: $${t.amount}`).join(', ') : 'None'}.`;

      const response = await fetch('/api/advice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ summary }),
      });
      const data = await response.json();
      setAdvice(data.recommendation || "No advice available.");
    } catch (error) {
      setAdvice("Failed to load advice.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-teal-100 to-blue-100 dark:from-teal-900 dark:to-blue-900 rounded-xl p-6 shadow flex flex-col gap-2 items-center"
    >
      <span className="text-lg font-semibold text-teal-700 dark:text-teal-300">AI Money Coach</span>
      <span className="text-gray-700 dark:text-gray-200 text-center">{advice}</span>
      <button
        onClick={fetchAdvice}
        disabled={loading}
        className="mt-2 px-4 py-1 rounded bg-teal-600 text-white hover:bg-teal-700 transition disabled:opacity-50"
      >
        {loading ? 'Loading...' : 'Next Suggestion'}
      </button>
    </motion.div>
  );
}
