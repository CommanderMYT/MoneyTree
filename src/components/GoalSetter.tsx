import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { saveUserData, getUserData } from "../lib/firestore";

export default function GoalSetter() {
  const [goal, setGoal] = useState(5000);
  const [months, setMonths] = useState(12);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.email) {
      getUserData(session.user.email, "goal").then((data) => {
        if (data) {
          setGoal(data.g || 5000);
          setMonths(data.m || 12);
        }
        setLoading(false);
      });
    } else {
      const raw = localStorage.getItem("mt_goal");
      if (raw) {
        try {
          const { g, m } = JSON.parse(raw);
          if (g) setGoal(g);
          if (m) setMonths(m);
        } catch {}
      }
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    if (!loading) {
      const data = { g: goal, m: months };
      if (session?.user?.email) {
        saveUserData(session.user.email, "goal", data);
      } else {
        localStorage.setItem("mt_goal", JSON.stringify(data));
      }
    }
  }, [goal, months, session, loading]);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-green-100 to-teal-100 dark:from-green-900 dark:to-teal-900 rounded-xl p-6 shadow flex flex-col gap-2 items-center"
    >
      <span className="text-lg font-semibold text-green-700 dark:text-green-300">Goal Setting</span>
      {loading ? (
        <div className="text-gray-500">Loading...</div>
      ) : (
        <>
          <div className="flex gap-2 items-center">
            <span className="text-gray-700 dark:text-gray-200">Save</span>
            <input
              type="number"
              value={goal}
              onChange={e => setGoal(Number(e.target.value))}
              className="w-24 px-2 py-1 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200"
            />
            <span className="text-gray-700 dark:text-gray-200">in</span>
            <input
              type="number"
              value={months}
              onChange={e => setMonths(Number(e.target.value))}
              className="w-16 px-2 py-1 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200"
            />
            <span className="text-gray-700 dark:text-gray-200">months</span>
          </div>
          <span className="text-teal-700 dark:text-teal-300 mt-2">You need to save ${(goal / months).toFixed(2)} per month.</span>
        </>
      )}
    </motion.div>
  );
}
