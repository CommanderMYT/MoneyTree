import { useState } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

export default function Subscription() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const subscribe = async () => {
    if (!email && !session?.user?.email) return;
    setLoading(true);
    try {
      const subEmail = email || session?.user?.email;
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: subEmail }),
      });
      localStorage.setItem("mt_toast", JSON.stringify({ message: 'Subscribed successfully!', type: 'success' }));
      window.dispatchEvent(new Event('storage'));
      setEmail("");
    } catch {
      localStorage.setItem("mt_toast", JSON.stringify({ message: 'Subscription failed', type: 'error' }));
      window.dispatchEvent(new Event('storage'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-xl p-6 shadow flex flex-col gap-4 items-center"
    >
      <span className="text-lg font-semibold text-purple-700 dark:text-purple-300">Subscribe for Updates</span>
      <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
        Get the latest financial tips, app updates, and exclusive offers.
      </p>
      {!session?.user?.email ? (
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-2"
        />
      ) : (
        <p className="text-sm text-gray-600 dark:text-gray-400">Using your account email: {session.user.email}</p>
      )}
      <button
        onClick={subscribe}
        disabled={loading || (!email && !session?.user?.email)}
        className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700 transition disabled:opacity-50"
      >
        {loading ? 'Subscribing...' : 'Subscribe'}
      </button>
    </motion.div>
  );
}
