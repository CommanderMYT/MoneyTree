"use client";
import { useState } from "react";
import { useAuth } from "../../lib/auth";
import { motion } from "framer-motion";

export default function AuthPage() {
  const { user, signIn, signUp, signOut } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-950 rounded-xl p-8 shadow max-w-md w-full text-center">
          <div className="text-xl font-semibold mb-2">Welcome, {user.email}</div>
          <div className="text-gray-600 dark:text-gray-300 mb-6">You're signed in. Go back to the dashboard.</div>
          <div className="flex gap-3 justify-center">
            <a href="/" className="px-4 py-2 rounded bg-teal-600 text-white hover:bg-teal-700 transition">Dashboard</a>
            <button onClick={() => signOut()} className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-800 dark:text-gray-100 hover:opacity-90 transition">Sign out</button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-950 rounded-xl p-8 shadow max-w-md w-full">
        <div className="text-2xl font-bold text-teal-700 dark:text-teal-300 text-center mb-4">MoneyTree</div>
        <div className="flex justify-center gap-3 mb-6">
          <button onClick={() => setMode("signin")} className={`px-4 py-2 rounded ${mode === "signin" ? "bg-teal-600 text-white" : "bg-gray-100 dark:bg-gray-800 dark:text-gray-200"}`}>Sign in</button>
          <button onClick={() => setMode("signup")} className={`px-4 py-2 rounded ${mode === "signup" ? "bg-teal-600 text-white" : "bg-gray-100 dark:bg-gray-800 dark:text-gray-200"}`}>Sign up</button>
        </div>
        <div className="flex flex-col gap-3">
          <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-2" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-2" />
          {mode === "signin" ? (
            <button onClick={() => signIn(email, password)} className="px-4 py-2 rounded bg-teal-600 text-white hover:bg-teal-700 transition">Sign in</button>
          ) : (
            <button onClick={() => signUp(email, password)} className="px-4 py-2 rounded bg-teal-600 text-white hover:bg-teal-700 transition">Create account</button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
