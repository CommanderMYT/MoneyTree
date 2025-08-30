// Investment API Types
export interface InvestopediaQuote {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap?: number;
  peRatio?: number;
  dividendYield?: number;
  fiftyTwoWeekHigh?: number;
  fiftyTwoWeekLow?: number;
  beta?: number;
  eps?: number;
  lastUpdated: Date;
}

export interface InvestopediaNews {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  publishedAt: Date;
  symbols: string[];
  sentiment?: 'positive' | 'negative' | 'neutral';
}

export interface InvestopediaAnalysis {
  symbol: string;
  recommendation: 'buy' | 'hold' | 'sell' | 'strong_buy' | 'strong_sell';
  targetPrice: number;
  currentPrice: number;
  upside: number;
  upsidePercent: number;
  analystCount: number;
  lastUpdated: Date;
}

export interface MarketIndex {
  symbol: string;
  name: string;
  value: number;
  change: number;
  changePercent: number;
  lastUpdated: Date;
}

export interface SectorPerformance {
  sector: string;
  performance: number;
  marketCap: number;
  volume: number;
}

export interface InvestmentHolding {
  symbol: string;
  name: string;
  shares: number;
  averageCost: number;
  currentPrice: number;
  marketValue: number;
  gainLoss: number;
  gainLossPercent: number;
  allocation: number; // percentage of portfolio
  sector: string;
  lastUpdated: Date;
}

export interface PortfolioMetrics {
  totalValue: number;
  totalGainLoss: number;
  totalGainLossPercent: number;
  dailyChange: number;
  dailyChangePercent: number;
  annualizedReturn: number;
  volatility: number;
  sharpeRatio: number;
  maxDrawdown: number;
  diversificationScore: number; // 0-100
}

export interface InvestmentAlert {
  id: string;
  userId: string;
  symbol: string;
  type: AlertType;
  condition: AlertCondition;
  value: number;
  isActive: boolean;
  triggeredAt?: Date;
  createdAt: Date;
}

export type AlertType = 'price' | 'volume' | 'percentage_change' | 'technical';

export interface AlertCondition {
  operator: 'above' | 'below' | 'equals' | 'crosses_above' | 'crosses_below';
  timeframe?: '1m' | '5m' | '15m' | '1h' | '1d';
}

// Watchlist Types
export interface Watchlist {
  id: string;
  userId: string;
  name: string;
  description?: string;
  symbols: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface WatchlistItem {
  symbol: string;
  addedAt: Date;
  alertPrice?: number;
  notes?: string;
}

// Screener Types
export interface StockScreener {
  marketCap?: {
    min?: number;
    max?: number;
  };
  peRatio?: {
    min?: number;
    max?: number;
  };
  dividendYield?: {
    min?: number;
    max?: number;
  };
  price?: {
    min?: number;
    max?: number;
  };
  volume?: {
    min?: number;
    max?: number;
  };
  sector?: string[];
  industry?: string[];
  country?: string[];
  exchange?: string[];
}

export interface ScreenerResult {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  peRatio?: number;
  dividendYield?: number;
  sector: string;
  industry: string;
  exchange: string;
}

// ETF Types
export interface ETFInfo {
  symbol: string;
  name: string;
  description: string;
  expenseRatio: number;
  aum: number; // Assets Under Management
  inceptionDate: Date;
  issuer: string;
  benchmark: string;
  holdings: ETFHolding[];
  sectorWeights: SectorWeight[];
  countryWeights: CountryWeight[];
}

export interface ETFHolding {
  symbol: string;
  name: string;
  weight: number; // percentage
  shares: number;
  value: number;
}

export interface SectorWeight {
  sector: string;
  weight: number;
}

export interface CountryWeight {
  country: string;
  weight: number;
}

// Crypto Types
export interface CryptoCurrency {
  id: string;
  symbol: string;
  name: string;
  price: number;
  marketCap: number;
  volume24h: number;
  change24h: number;
  changePercent24h: number;
  rank: number;
  circulatingSupply: number;
  totalSupply?: number;
  maxSupply?: number;
  lastUpdated: Date;
}

export interface CryptoNews {
  id: string;
  title: string;
  content: string;
  url: string;
  source: string;
  publishedAt: Date;
  currencies: string[];
  sentiment: 'positive' | 'negative' | 'neutral';
}

// Investment Calculator Types
export interface InvestmentCalculator {
  type: 'compound_interest' | 'retirement' | 'mortgage' | 'loan' | 'savings';
  inputs: Record<string, number>;
  results: Record<string, number>;
}

export interface CompoundInterestInputs {
  principal: number;
  annualContribution: number;
  annualRate: number;
  years: number;
  compoundFrequency: number;
}

export interface RetirementInputs {
  currentAge: number;
  retirementAge: number;
  currentSavings: number;
  annualContribution: number;
  expectedReturn: number;
  inflationRate: number;
  retirementIncome: number;
}

// Risk Assessment Types
export interface RiskProfile {
  score: number; // 1-10
  level: 'conservative' | 'moderate' | 'aggressive';
  riskTolerance: number;
  timeHorizon: number;
  investmentGoals: string[];
  recommendedAllocation: {
    stocks: number;
    bonds: number;
    cash: number;
    alternatives: number;
  };
}

export interface RiskAssessment {
  userId: string;
  answers: Record<string, any>;
  profile: RiskProfile;
  createdAt: Date;
  updatedAt: Date;
}
