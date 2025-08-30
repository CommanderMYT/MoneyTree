import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { saveUserData, getUserData } from "../lib/firestore";

export default function AutoPayScheduler() {
  const [payee, setPayee] = useState("Credit Card");
  const [amount, setAmount] = useState(200);
  const [date, setDate] = useState("");
  const [scheduled, setScheduled] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.email) {
      getUserData(session.user.email, "autopay").then((data) => {
        if (data) setScheduled(data);
        setLoading(false);
      });
    } else {
      const raw = localStorage.getItem("mt_autopay");
      if (raw) setScheduled(raw);
      setLoading(false);
    }
  }, [session]);

  const schedule = () => {
    if (!date) return;
    const value = `${payee} - $${amount} on ${date}`;
    setScheduled(value);
    if (session?.user?.email) {
      saveUserData(session.user.email, "autopay", value);
    } else {
      localStorage.setItem("mt_autopay", value);
    }
    localStorage.setItem("mt_toast", JSON.stringify({ message: `Scheduled ${value}`, type: 'success' }));
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="bg-white dark:bg-gray-950 rounded-xl p-6 shadow flex flex-col gap-3">
      <span className="text-lg font-semibold text-purple-700 dark:text-purple-300">Auto-Pay Scheduler</span>
      {loading ? (
        <div className="text-gray-500">Loading...</div>
      ) : (
        <>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-600 dark:text-gray-300">Payee</label>
            <select value={payee} onChange={(e) => setPayee(e.target.value)} className="rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-2">
              <option>Credit Card</option>
              <option>Mortgage</option>
              <option>Utilities</option>
            </select>
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-sm text-gray-600 dark:text-gray-300">Amount</label>
              <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-2" />
            </div>
            <div className="flex-1">
              <label className="text-sm text-gray-600 dark:text-gray-300">Date</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-2" />
            </div>
          </div>
          <button onClick={schedule} className="mt-2 px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700 transition">Schedule</button>
          {scheduled && <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">Scheduled: {scheduled}</div>}
        </>
      )}
    </motion.div>
  );
}
