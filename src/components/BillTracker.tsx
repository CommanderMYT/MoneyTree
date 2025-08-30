import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { detectRecurring, Transaction, Subscription } from "../lib/recurring";
import { useSession } from "next-auth/react";

const mockBills = [
  { name: "Netflix", amount: 15, due: "2025-09-01", recurring: true },
  { name: "Car Insurance", amount: 120, due: "2025-09-10", recurring: true },
  { name: "Electricity", amount: 60, due: "2025-09-05", recurring: true },
  { name: "Spotify", amount: 10, due: "2025-09-03", recurring: true },
];

export default function BillTracker() {
  const [bills, setBills] = useState<Subscription[]>([]);
  const { data: session } = useSession();

  // Load recurring detection from transactions if present, else use mock
  useEffect(() => {
    const raw = localStorage.getItem("mt_transactions");
    if (raw) {
      try {
        const txs = JSON.parse(raw) as Transaction[];
        const subs = detectRecurring(txs);
        setBills(subs.length ? subs : mockBills);
      } catch {
        setBills(mockBills);
      }
    } else {
      setBills(mockBills);
    }
  }, []);
  const cancelBill = (name: string) => {
    setBills((prev) => prev.filter((b) => b.name !== name));
    localStorage.setItem("mt_toast", JSON.stringify({ message: `Cancelled ${name}`, type: 'info' }));
    window.dispatchEvent(new Event('storage'));
  };

  const sendReminder = async (bill: Subscription) => {
    if (!session?.user?.email) {
      localStorage.setItem("mt_toast", JSON.stringify({ message: 'Please sign in to send reminders', type: 'error' }));
      window.dispatchEvent(new Event('storage'));
      return;
    }
    try {
      await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: session.user.email,
          subject: `Bill Reminder: ${bill.name}`,
          text: `Reminder: Your ${bill.name} bill of $${bill.amount} is due on ${bill.due}.`,
        }),
      });
      localStorage.setItem("mt_toast", JSON.stringify({ message: 'Reminder sent!', type: 'success' }));
      window.dispatchEvent(new Event('storage'));
    } catch {
      localStorage.setItem("mt_toast", JSON.stringify({ message: 'Failed to send reminder', type: 'error' }));
      window.dispatchEvent(new Event('storage'));
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-gray-950 rounded-xl p-6 shadow flex flex-col gap-4"
    >
      <span className="text-lg font-semibold text-blue-700 dark:text-blue-300">Bills & Subscriptions</span>
      <ul className="flex flex-col gap-2">
        {bills.map((bill) => (
          <li key={bill.name} className="flex justify-between items-center bg-blue-50 dark:bg-blue-900 rounded p-2">
            <span className="font-medium text-gray-700 dark:text-gray-200">{bill.name}</span>
            <span className="text-gray-500 dark:text-gray-400">${bill.amount} due {bill.due}</span>
            <div className="flex gap-2">
              <button
                onClick={() => sendReminder(bill)}
                className="px-2 py-1 rounded bg-yellow-500 text-white hover:bg-yellow-600 transition text-sm"
              >
                Remind
              </button>
              <button
                onClick={() => cancelBill(bill.name)}
                className="px-2 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition text-sm"
              >
                Cancel
              </button>
            </div>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
