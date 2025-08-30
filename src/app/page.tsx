
"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ChartBarIcon, CreditCardIcon, Cog6ToothIcon, SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { BanknotesIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import { usePlaidLink } from 'react-plaid-link';
import { useSession, signIn, signOut } from "next-auth/react";

const tabs = [
  { name: "Dashboard", icon: <ChartBarIcon className="h-6 w-6" /> },
  { name: "Accounts", icon: <CreditCardIcon className="h-6 w-6" /> },
  { name: "Invest", icon: <BanknotesIcon className="h-6 w-6" /> },
  { name: "Insurance", icon: <ShieldCheckIcon className="h-6 w-6" /> },
  { name: "Settings", icon: <Cog6ToothIcon className="h-6 w-6" /> },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const { data: session } = useSession();

  // Toggle dark/light mode
  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("mt_dark") : null;
    const isDark = saved === "1";
    setDarkMode(isDark);
    if (isDark) document.documentElement.classList.add("dark");
  }, []);

  const toggleTheme = () => {
    setDarkMode((d) => {
      const next = !d;
      if (typeof window !== "undefined") {
        document.documentElement.classList.toggle("dark", next);
        localStorage.setItem("mt_dark", next ? "1" : "0");
      }
      return next;
    });
  };

  const [showLogo, setShowLogo] = useState(true);

  return (
    <div className={`min-h-screen font-sans bg-gradient-to-br from-blue-50 via-teal-50 to-gray-100 dark:from-gray-900 dark:via-blue-950 dark:to-teal-900 transition-colors duration-500`}> 
      <header className="flex items-center justify-between px-8 py-6 shadow-sm bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
        <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="flex items-center gap-3">
          {showLogo && (
            <img src="/logo.png" alt="MoneyTree logo" className="h-10 w-10 rounded" onError={() => setShowLogo(false)} />
          )}
          <h1 className="text-3xl font-bold text-teal-700 dark:text-teal-300 tracking-tight">MoneyTree</h1>
        </motion.div>
        <div className="flex items-center gap-3">
          {session ? (
            <>
              <span className="text-sm text-gray-700 dark:text-gray-300">Welcome, {session.user?.name}</span>
              <button onClick={() => signOut()} className="rounded-full px-3 py-2 bg-teal-600 text-white hover:bg-teal-700 transition">Sign out</button>
            </>
          ) : (
            <button onClick={() => signIn("google")} className="rounded-full px-3 py-2 bg-teal-600 text-white hover:bg-teal-700 transition">Sign in with Google</button>
          )}
        <button
          aria-label="Toggle theme"
          onClick={toggleTheme}
          className="rounded-full p-2 bg-teal-100 dark:bg-gray-800 hover:bg-teal-200 dark:hover:bg-gray-700 transition"
        >
          {darkMode ? <SunIcon className="h-6 w-6 text-yellow-400" /> : <MoonIcon className="h-6 w-6 text-blue-600" />}
        </button>
        </div>
      </header>
      <div className="flex">
        {/* Sidebar Navigation */}
        <nav className="w-20 min-h-[80vh] flex flex-col items-center py-8 gap-8 bg-white/70 dark:bg-gray-900/70 shadow-lg">
          {tabs.map((tab, idx) => (
            <motion.button
              key={tab.name}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              className={`flex flex-col items-center gap-1 text-xs font-medium transition-colors ${activeTab === idx ? "text-teal-600 dark:text-teal-300" : "text-gray-400 dark:text-gray-500"}`}
              onClick={() => setActiveTab(idx)}
            >
              {tab.icon}
              {tab.name}
            </motion.button>
          ))}
        </nav>
        {/* Main Content */}
    <main className="flex-1 p-8">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
      {activeTab === 0 && <DashboardMVP />}
      {activeTab === 1 && <Accounts />}
      {activeTab === 2 && <Invest />}
      {activeTab === 3 && <Insurance />}
      {activeTab === 4 && <Settings />}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

import AnimatedTree from "../components/AnimatedTree";
import BillTracker from "../components/BillTracker";
import AIAdvice from "../components/AIAdvice";
import GoalSetter from "../components/GoalSetter";
import SpendingChart from "../components/SpendingChart";
import AutoPayScheduler from "../components/AutoPayScheduler";
import BudgetTracker from "../components/BudgetTracker";
import Subscription from "../components/Subscription";
import FinancialCalculator from "../components/FinancialCalculator";

function DashboardMVP() {
  // Mock savings for tree animation
  const savings = 3200;
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-gray-950 rounded-2xl shadow-xl p-8 flex flex-col gap-8"
    >
      <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
        <AnimatedTree savings={savings} />
        <div className="flex flex-col gap-4 w-full max-w-md">
          <div className="grid grid-cols-2 gap-4">
            <StatCard label="Net Worth" value="$15,700" color="bg-teal-100 dark:bg-teal-900" />
            <StatCard label="Upcoming Bills" value="$1,200" color="bg-blue-100 dark:bg-blue-900" />
          </div>
          <StatCard label="Investments" value="$8,000" color="bg-gray-100 dark:bg-gray-800" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <BillTracker />
        <AIAdvice />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <GoalSetter />
        <SpendingChart />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <AutoPayScheduler />
        <PlaidMock />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <Subscription />
        <FinancialCalculator />
      </div>
    </motion.section>
  );
}

function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} className={`rounded-xl shadow-md p-6 flex flex-col items-center ${color} transition-colors`}>
      <span className="text-lg font-medium text-gray-700 dark:text-gray-200">{label}</span>
      <span className="text-2xl font-bold text-teal-700 dark:text-teal-300 mt-2">{value}</span>
    </motion.div>
  );
}

function MockChart() {
  // Placeholder for animated chart
  return (
    <div className="w-full h-48 flex items-center justify-center">
      <span className="text-gray-400 dark:text-gray-600">[Animated Chart Here]</span>
    </div>
  );
}

function Accounts() {
  return (
    <motion.section initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="bg-white dark:bg-gray-950 rounded-2xl shadow-xl p-8">
      <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-300 mb-2">Linked Accounts</h2>
      <p className="text-gray-600 dark:text-gray-400">Connect your bank, credit cards, and investment accounts to see everything in one place.</p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900 text-blue-800 dark:text-blue-200">Bank of America - Checking: $5,000</div>
        <div className="p-4 rounded-lg bg-teal-50 dark:bg-teal-900 text-teal-800 dark:text-teal-200">Chase - Credit Card: $2,500</div>
        <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200">Vanguard - Investments: $8,000</div>
        <PlaidMock />
      </div>
    </motion.section>
  );
}

function Invest() {
  return (
    <motion.section initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="bg-white dark:bg-gray-950 rounded-2xl shadow-xl p-8">
      <h2 className="text-2xl font-semibold text-emerald-700 dark:text-emerald-300 mb-2">Investing</h2>
      <p className="text-gray-600 dark:text-gray-400">Simple, AI-driven portfolio builder. Mock allocation shown below.</p>
      <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
        <li className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200">US Stocks (VTI): 50%</li>
        <li className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900 text-blue-800 dark:text-blue-200">International (VXUS): 20%</li>
        <li className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900 text-purple-800 dark:text-purple-200">Bonds (BND): 25%</li>
        <li className="p-4 rounded-lg bg-orange-50 dark:bg-orange-900 text-orange-800 dark:text-orange-200">Cash: 5%</li>
      </ul>
      <div className="mt-6 text-sm text-gray-600 dark:text-gray-400">Suggestion: Shift 10% from cash to bonds for safer alignment with your goal.</div>
    </motion.section>
  );
}

function Insurance() {
  return (
    <motion.section initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="bg-white dark:bg-gray-950 rounded-2xl shadow-xl p-8">
      <h2 className="text-2xl font-semibold text-indigo-700 dark:text-indigo-300 mb-2">Insurance Hub</h2>
      <p className="text-gray-600 dark:text-gray-400">Upload your policies and track renewals. Mock policies listed:</p>
      <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
        <li className="p-4 rounded-lg bg-indigo-50 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200">Car - GEICO - $120/mo - Renews: 2026-01-01</li>
        <li className="p-4 rounded-lg bg-sky-50 dark:bg-sky-900 text-sky-800 dark:text-sky-200">Health - BlueCross - $350/mo - Renews: 2026-06-01</li>
      </ul>
      <div className="mt-6 text-sm text-gray-600 dark:text-gray-400">AI: You could save ~$25/mo by switching car insurance.</div>
    </motion.section>
  );
}

function PlaidMock() {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchLinkToken = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/plaid/link-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'demo-user' }),
      });
      const data = await response.json();
      setLinkToken(data.link_token);
    } catch (error) {
      console.error('Error fetching link token:', error);
    } finally {
      setLoading(false);
    }
  };

  const onSuccess = async (publicToken: string) => {
    try {
      // Exchange public token for access token
      const exchangeResponse = await fetch('/api/plaid/exchange', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ public_token: publicToken }),
      });
      const exchangeData = await exchangeResponse.json();
      const accessToken = exchangeData.access_token;

      // Fetch transactions
      const transactionsResponse = await fetch('/api/plaid/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ access_token: accessToken }),
      });
      const transactionsData = await transactionsResponse.json();
      const transactions = transactionsData.transactions;

      // Store in localStorage
      localStorage.setItem('mt_plaid_access_token', accessToken);
      localStorage.setItem('mt_transactions', JSON.stringify(transactions));

      // Trigger toast
      localStorage.setItem('mt_toast', JSON.stringify({ message: 'Account linked successfully!', type: 'success' }));
      window.dispatchEvent(new Event('storage'));

      // Reset link token
      setLinkToken(null);
    } catch (error) {
      console.error('Error linking account:', error);
      localStorage.setItem('mt_toast', JSON.stringify({ message: 'Failed to link account.', type: 'error' }));
      window.dispatchEvent(new Event('storage'));
    }
  };

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess,
    onExit: () => setLinkToken(null),
  });

  useEffect(() => {
    if (linkToken && ready) {
      open();
    }
  }, [linkToken, ready, open]);

  return (
    <div className="p-6 rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 text-slate-800 dark:text-slate-200 shadow">
      <div className="font-semibold mb-2">Connect Accounts (Plaid Sandbox)</div>
      <div className="text-sm mb-3 text-slate-600 dark:text-slate-300">Link your bank to load real transactions.</div>
      <button
        onClick={fetchLinkToken}
        disabled={loading}
        className="px-4 py-2 rounded bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90 transition disabled:opacity-50"
      >
        {loading ? 'Loading...' : 'Open Plaid Link'}
      </button>
      <div className="text-xs mt-2 text-slate-500">Sandbox only for demo. Uses Plaid sandbox credentials.</div>
    </div>
  );
}

function Settings() {
  return (
    <motion.section initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="bg-white dark:bg-gray-950 rounded-2xl shadow-xl p-8">
      <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-2">Settings</h2>
      <p className="text-gray-600 dark:text-gray-400">Manage your profile, theme, and account connections here.</p>
      <div className="mt-6 flex flex-col gap-4">
        <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">Theme: <span className="font-bold">{typeof window !== "undefined" && document.documentElement.classList.contains("dark") ? "Dark" : "Light"}</span></div>
        <div className="p-4 rounded-lg bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200">Account: user@email.com</div>
      </div>
    </motion.section>
  );
}
