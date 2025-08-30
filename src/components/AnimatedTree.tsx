import { motion } from "framer-motion";

export default function AnimatedTree({ savings = 0 }: { savings: number }) {
  // Tree grows based on savings
  const treeHeight = 100 + Math.min(savings / 100, 200);
  return (
    <div className="flex flex-col items-center justify-center">
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 + savings / 10000 }}
        transition={{ duration: 1 }}
        className="relative"
        style={{ height: treeHeight, width: 120 }}
      >
        {/* Trunk */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-8 h-32 bg-amber-700 rounded-full" style={{ height: treeHeight * 0.32 }} />
        {/* Leaves */}
        <motion.div
          initial={{ scale: 0.7 }}
          animate={{ scale: 1 + savings / 5000 }}
          transition={{ duration: 1 }}
          className="absolute left-1/2 -translate-x-1/2 bottom-20 w-32 h-32 bg-gradient-to-br from-teal-400 to-green-500 rounded-full shadow-lg"
          style={{ bottom: treeHeight * 0.32 }}
        />
        {/* Branches (grow with savings) */}
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{ opacity: Math.min(1, savings / 5000) }}
          transition={{ duration: 1 }}
          className="absolute left-1/2 -translate-x-1/2 bottom-24 w-24 h-8 bg-green-700 rounded-full"
          style={{ bottom: treeHeight * 0.4 }}
        />
      </motion.div>
      <span className="mt-2 text-teal-700 dark:text-teal-300 font-semibold">Savings: ${savings.toLocaleString()}</span>
    </div>
  );
}
