"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ChartBarIcon, CreditCardIcon, Cog6ToothIcon, SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { BanknotesIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import { useSession, signIn, signOut } from "next-auth/react";

const tabs = [
  { name: "Dashboard", icon: <ChartBarIcon className="h-6 w-6" /> },
  { name: "Accounts", icon: <CreditCardIcon className="h-6 w-6" /> },
  { name: "Invest", icon: <BanknotesIcon className="h-6 w-6" /> },
  { name: "Insurance", icon: <ShieldCheckIcon className="h-6 w-6" /> },
  { name: "Settings", icon: <Cog6ToothIcon className="h-6 w-6" /> },
];

// Landing Page Component
function LandingPage() {
  const [showLogo, setShowLogo] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-gray-100 dark:from-gray-900 dark:via-blue-950 dark:to-teal-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center mb-8"
            >
              {showLogo && (
                <img
                  src="/logo.png"
                  alt="MoneyTree logo"
                  className="h-20 w-20 rounded-full shadow-lg"
                  onError={() => setShowLogo(false)}
                />
              )}
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-teal-700 dark:text-teal-300 mb-6"
            >
              MoneyTree
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto"
            >
              AI-Powered Personal Finance Dashboard for Smart Money Management
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-16"
            >
              <button
                onClick={() => signIn("google")}
                className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Get Started with Google
              </button>
            </motion.div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
                Our Mission
              </h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                To democratize personal finance education and empower everyone, regardless of age or background,
                to take control of their financial future through intelligent, accessible, and user-friendly tools.
              </p>
            </motion.div>
          </div>
        </div>

        {/* About Lincoln Section */}
        <div className="bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Meet Lincoln Thomson
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                  At just 13 years old, Lincoln Thomson is on a mission to help others achieve financial freedom.
                  What started as a personal journey to understand money management has evolved into a passion
                  to create tools that make financial education accessible to everyone.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Lincoln believes that financial literacy shouldn't be complicated or intimidating.
                  MoneyTree is his vision of making smart money management simple, fun, and empowering for people of all ages.
                </p>
              </div>
              <div className="flex justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 rounded-full p-8 shadow-lg"
                >
                  <div className="text-6xl">🌱</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Features Preview */}
        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                What You'll Get
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Powerful features designed to grow your financial knowledge
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: "📊",
                  title: "Smart Dashboard",
                  description: "Track all your accounts, expenses, and financial goals in one beautiful interface."
                },
                {
                  icon: "🤖",
                  title: "AI-Powered Insights",
                  description: "Get personalized financial advice and recommendations powered by advanced AI."
                },
                {
                  icon: "📈",
                  title: "Investment Tracking",
                  description: "Monitor your portfolio performance and discover new investment opportunities."
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-teal-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Grow Your Money Tree?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of users taking control of their financial future
              </p>
              <button
                onClick={() => signIn("google")}
                className="bg-white text-teal-600 font-semibold py-4 px-8 rounded-full text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Start Your Journey Today
              </button>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gray-400">
              © 2025 MoneyTree. Created by Lincoln Thomson with ❤️
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

// Dashboard Component (existing functionality)
function Dashboard() {
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

// Main Home Component
export default function Home() {
  const { data: session, status } = useSession();

  // Show loading state while checking authentication
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-teal-50 to-gray-100 dark:from-gray-900 dark:via-blue-950 dark:to-teal-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading MoneyTree...</p>
        </div>
      </div>
    );
  }

  // Show dashboard if authenticated, landing page if not
  return session ? <Dashboard /> : <LandingPage />;
}

// Dashboard MVP Component
function DashboardMVP() {
  const savings = 3200;
  const checking = 1250;
  const creditLimit = 5000;
  const creditUsed = 1200;
  const creditAvailable = creditLimit - creditUsed;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Financial Overview</h2>
        <p className="text-gray-600 dark:text-gray-300">Your money at a glance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Total Savings" value={`$${savings.toLocaleString()}`} color="text-green-600" />
        <StatCard label="Checking Balance" value={`$${checking.toLocaleString()}`} color="text-blue-600" />
        <StatCard label="Credit Available" value={`$${creditAvailable.toLocaleString()}`} color="text-purple-600" />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Transactions</h3>
        <div className="space-y-3">
          {[
            { description: "Grocery Store", amount: -85.32, date: "Today" },
            { description: "Salary Deposit", amount: 2500.00, date: "Yesterday" },
            { description: "Coffee Shop", amount: -4.75, date: "2 days ago" },
          ].map((transaction, idx) => (
            <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{transaction.description}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{transaction.date}</p>
              </div>
              <span className={`font-semibold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Placeholder components for other tabs
function Accounts() {
  return (
    <div className="text-center py-12">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Account Management</h3>
      <p className="text-gray-600 dark:text-gray-300">Connect and manage your financial accounts</p>
    </div>
  );
}

function Invest() {
  return (
    <div className="text-center py-12">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Investment Dashboard</h3>
      <p className="text-gray-600 dark:text-gray-300">Track your portfolio and discover opportunities</p>
    </div>
  );
}

function Insurance() {
  return (
    <div className="text-center py-12">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Insurance Overview</h3>
      <p className="text-gray-600 dark:text-gray-300">Manage your insurance policies</p>
    </div>
  );
}

function Settings() {
  return (
    <div className="text-center py-12">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Settings</h3>
      <p className="text-gray-600 dark:text-gray-300">Customize your MoneyTree experience</p>
    </div>
  );
}

// Stat Card Component
function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{label}</h3>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}
