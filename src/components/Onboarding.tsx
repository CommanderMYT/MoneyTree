"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

export default function Onboarding() {
  const [show, setShow] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (session && !localStorage.getItem("mt_onboarded")) {
      setShow(true);
    }
  }, [session]);

  const complete = () => {
    localStorage.setItem("mt_onboarded", "true");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-gray-900 rounded-xl p-8 max-w-md mx-4"
      >
        <h2 className="text-2xl font-bold text-teal-700 dark:text-teal-300 mb-4">Welcome to MoneyTree! 🌱</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Let's get you started with managing your finances. Here's what you can do:
        </p>
        <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 mb-6">
          <li>Link your bank accounts via Plaid</li>
          <li>Set savings goals and track budgets</li>
          <li>Get AI-powered financial advice</li>
          <li>Subscribe for updates and tips</li>
        </ul>
        <button
          onClick={complete}
          className="w-full px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition"
        >
          Get Started
        </button>
      </motion.div>
    </div>
  );
}
