// User Types
export interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Financial Account Types
export interface Account {
  id: string;
  userId: string;
  name: string;
  type: AccountType;
  balance: number;
  currency: string;
  institution: string;
  accountNumber?: string;
  isActive: boolean;
  lastSync?: Date;
  plaidAccountId?: string;
}

export type AccountType =
  | 'checking'
  | 'savings'
  | 'credit_card'
  | 'investment'
  | 'loan'
  | 'mortgage'
  | 'retirement';

// Transaction Types
export interface Transaction {
  id: string;
  userId: string;
  accountId: string;
  amount: number;
  description: string;
  category: TransactionCategory;
  subcategory?: string;
  date: Date;
  merchant?: string;
  location?: TransactionLocation;
  tags?: string[];
  isRecurring: boolean;
  recurringId?: string;
  plaidTransactionId?: string;
  status: TransactionStatus;
}

export interface TransactionLocation {
  address?: string;
  city?: string;
  region?: string;
  postalCode?: string;
  country?: string;
  lat?: number;
  lon?: number;
}

export type TransactionStatus = 'pending' | 'posted' | 'cancelled';

export type TransactionCategory =
  | 'income'
  | 'expense'
  | 'transfer'
  | 'payment'
  | 'fee'
  | 'interest'
  | 'dividend'
  | 'capital_gain';

// Investment Types
export interface Investment {
  id: string;
  userId: string;
  symbol: string;
  name: string;
  type: InvestmentType;
  quantity: number;
  averageCost: number;
  currentPrice: number;
  marketValue: number;
  gainLoss: number;
  gainLossPercent: number;
  lastUpdated: Date;
  exchange: string;
  sector?: string;
  industry?: string;
}

export type InvestmentType =
  | 'stock'
  | 'etf'
  | 'mutual_fund'
  | 'bond'
  | 'crypto'
  | 'option'
  | 'future';

// Investment Quote Types
export interface InvestmentQuote {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap?: number;
  peRatio?: number;
  dividendYield?: number;
  lastUpdated: Date;
}

// Portfolio Types
export interface Portfolio {
  id: string;
  userId: string;
  name: string;
  description?: string;
  investments: Investment[];
  totalValue: number;
  totalGainLoss: number;
  totalGainLossPercent: number;
  createdAt: Date;
  updatedAt: Date;
}

// Budget Types
export interface Budget {
  id: string;
  userId: string;
  name: string;
  category: TransactionCategory;
  subcategory?: string;
  amount: number;
  period: BudgetPeriod;
  spent: number;
  remaining: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
}

export type BudgetPeriod = 'weekly' | 'monthly' | 'quarterly' | 'yearly';

// Goal Types
export interface Goal {
  id: string;
  userId: string;
  name: string;
  description?: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: Date;
  category: GoalCategory;
  priority: GoalPriority;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type GoalCategory =
  | 'emergency_fund'
  | 'vacation'
  | 'car'
  | 'house'
  | 'education'
  | 'retirement'
  | 'investment'
  | 'debt_payoff'
  | 'other';

export type GoalPriority = 'low' | 'medium' | 'high' | 'critical';

// Bill/Subscription Types
export interface Bill {
  id: string;
  userId: string;
  name: string;
  description?: string;
  amount: number;
  dueDate: Date;
  category: TransactionCategory;
  isRecurring: boolean;
  frequency?: RecurringFrequency;
  nextDueDate?: Date;
  isPaid: boolean;
  autoPayEnabled: boolean;
  accountId?: string;
  merchant?: string;
  reminderDays: number;
  status: BillStatus;
}

export type RecurringFrequency =
  | 'daily'
  | 'weekly'
  | 'biweekly'
  | 'monthly'
  | 'quarterly'
  | 'semiannually'
  | 'yearly';

export type BillStatus = 'pending' | 'paid' | 'overdue' | 'cancelled';

// Email Types
export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  htmlContent: string;
  textContent: string;
  variables: string[];
  category: EmailCategory;
}

export type EmailCategory =
  | 'welcome'
  | 'bill_reminder'
  | 'budget_alert'
  | 'goal_achievement'
  | 'investment_alert'
  | 'newsletter'
  | 'password_reset'
  | 'account_update';

export interface EmailLog {
  id: string;
  userId: string;
  templateId?: string;
  to: string;
  subject: string;
  status: EmailStatus;
  sentAt?: Date;
  errorMessage?: string;
  metadata?: Record<string, any>;
}

export type EmailStatus = 'pending' | 'sent' | 'failed' | 'bounced';

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Plaid Types
export interface PlaidLinkToken {
  link_token: string;
  expiration: string;
  request_id: string;
}

export interface PlaidAccessToken {
  access_token: string;
  item_id: string;
  request_id: string;
}

export interface PlaidTransaction {
  account_id: string;
  amount: number;
  iso_currency_code: string;
  unofficial_currency_code?: string;
  category?: string[];
  category_id?: string;
  date: string;
  authorized_date?: string;
  location?: {
    address?: string;
    city?: string;
    region?: string;
    postal_code?: string;
    country?: string;
    lat?: number;
    lon?: number;
  };
  name: string;
  merchant_name?: string;
  payment_meta?: {
    by_order_of?: string;
    payee?: string;
    payer?: string;
    payment_method?: string;
    payment_processor?: string;
    ppd_id?: string;
    reason?: string;
    reference_number?: string;
  };
  pending: boolean;
  pending_transaction_id?: string;
  transaction_id: string;
  transaction_type: string;
}

// Component Props Types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface DashboardProps extends BaseComponentProps {
  user: User;
  accounts: Account[];
  transactions: Transaction[];
  investments: Investment[];
  goals: Goal[];
  budgets: Budget[];
}

export interface ChartData {
  name: string;
  value: number;
  color?: string;
}

export interface TimeSeriesData {
  date: string;
  value: number;
  label?: string;
}

// Utility Types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Form Types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'date' | 'select' | 'textarea';
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: RegExp;
    custom?: (value: any) => boolean | string;
  };
}

export interface FormData {
  [key: string]: any;
}

// Error Types
export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  actionUrl?: string;
  metadata?: Record<string, any>;
}

export type NotificationType =
  | 'bill_due'
  | 'budget_exceeded'
  | 'goal_achieved'
  | 'investment_alert'
  | 'account_sync'
  | 'system_update';

// Settings Types
export interface UserSettings {
  userId: string;
  theme: 'light' | 'dark' | 'system';
  currency: string;
  dateFormat: string;
  notifications: {
    email: boolean;
    push: boolean;
    billReminders: boolean;
    budgetAlerts: boolean;
    investmentUpdates: boolean;
  };
  privacy: {
    shareAnalytics: boolean;
    allowMarketing: boolean;
  };
  updatedAt: Date;
}
