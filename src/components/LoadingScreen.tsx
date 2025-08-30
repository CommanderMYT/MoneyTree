"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // Simulate loading
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 1.5 }}
      className="fixed inset-0 bg-teal-50 dark:bg-gray-900 flex items-center justify-center z-50"
    >
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full mx-auto mb-4"
        ></motion.div>
        <h1 className="text-2xl font-bold text-teal-700 dark:text-teal-300">MoneyTree</h1>
        <p className="text-gray-600 dark:text-gray-400">Growing your financial future...</p>
      </div>
    </motion.div>
  );
}
