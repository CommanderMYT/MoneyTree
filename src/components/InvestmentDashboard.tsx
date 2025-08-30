"use client";

import { useState, useEffect } from 'react';
import {
  Investment,
  InvestmentQuote
} from '../types/index';
import {
  MarketIndex,
  SectorPerformance,
  Watchlist
} from '../types/investments';
import { investmentService } from '../lib/investment-service';

interface InvestmentDashboardProps {
  userId: string;
}

export default function InvestmentDashboard({ userId }: InvestmentDashboardProps) {
  const [portfolio, setPortfolio] = useState<Investment[]>([]);
  const [quotes, setQuotes] = useState<InvestmentQuote[]>([]);
  const [marketIndices, setMarketIndices] = useState<MarketIndex[]>([]);
  const [sectorPerformance, setSectorPerformance] = useState<SectorPerformance[]>([]);
  const [watchlist, setWatchlist] = useState<Watchlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');

  useEffect(() => {
    loadInvestmentData();
  }, [userId]);

  const loadInvestmentData = async () => {
    try {
      setLoading(true);

      // Load portfolio (this would come from your database)
      const userPortfolio = await loadUserPortfolio(userId);
      setPortfolio(userPortfolio);

      // Get quotes for portfolio symbols
      if (userPortfolio.length > 0) {
        const symbols = userPortfolio.map(inv => inv.symbol);
        const quoteData = await investmentService.getQuotes(symbols);
        setQuotes(quoteData);
      }

      // Load market indices
      const indices = await investmentService.getMarketIndices();
      setMarketIndices(indices);

      // Load sector performance
      const sectors = await investmentService.getSectorPerformance();
      setSectorPerformance(sectors);

      // Load watchlist
      const userWatchlist = await loadUserWatchlist(userId);
      setWatchlist(userWatchlist);

    } catch (error) {
      console.error('Error loading investment data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Mock functions - replace with actual database calls
  const loadUserPortfolio = async (userId: string): Promise<Investment[]> => {
    // This would fetch from your database
    return [
      {
        id: '1',
        userId,
        symbol: 'AAPL',
        name: 'Apple Inc.',
        type: 'stock',
        quantity: 10,
        averageCost: 150,
        currentPrice: 175,
        marketValue: 1750,
        gainLoss: 250,
        gainLossPercent: 16.67,
        lastUpdated: new Date(),
        exchange: 'NASDAQ',
        sector: 'Technology'
      },
      {
        id: '2',
        userId,
        symbol: 'GOOGL',
        name: 'Alphabet Inc.',
        type: 'stock',
        quantity: 5,
        averageCost: 2500,
        currentPrice: 2750,
        marketValue: 13750,
        gainLoss: 1250,
        gainLossPercent: 10,
        lastUpdated: new Date(),
        exchange: 'NASDAQ',
        sector: 'Technology'
      }
    ];
  };

  const loadUserWatchlist = async (userId: string): Promise<Watchlist[]> => {
    // This would fetch from your database
    return [
      {
        id: '1',
        userId,
        name: 'Tech Stocks',
        description: 'My favorite tech companies',
        symbols: ['AAPL', 'GOOGL', 'MSFT', 'AMZN'],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
  };

  const getTotalPortfolioValue = () => {
    return portfolio.reduce((total, investment) => total + investment.marketValue, 0);
  };

  const getTotalGainLoss = () => {
    return portfolio.reduce((total, investment) => total + investment.gainLoss, 0);
  };

  const getTotalGainLossPercent = () => {
    const totalCost = portfolio.reduce((total, investment) => total + (investment.averageCost * investment.quantity), 0);
    const totalValue = getTotalPortfolioValue();
    return totalCost > 0 ? ((totalValue - totalCost) / totalCost) * 100 : 0;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Portfolio Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Portfolio Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Value</p>
            <p className="text-2xl font-bold text-green-600">
              ${getTotalPortfolioValue().toLocaleString()}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Gain/Loss</p>
            <p className={`text-2xl font-bold ${getTotalGainLoss() >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${getTotalGainLoss().toLocaleString()}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Return</p>
            <p className={`text-2xl font-bold ${getTotalGainLossPercent() >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {getTotalGainLossPercent().toFixed(2)}%
            </p>
          </div>
        </div>
      </div>

      {/* Market Indices */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-xl font-bold mb-4">Market Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {marketIndices.map((index) => (
            <div key={index.symbol} className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">{index.name}</p>
              <p className="text-lg font-semibold">{index.value.toLocaleString()}</p>
              <p className={`text-sm ${index.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {index.change >= 0 ? '+' : ''}{index.change.toFixed(2)} ({index.changePercent.toFixed(2)}%)
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Portfolio Holdings */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-xl font-bold mb-4">Holdings</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Symbol</th>
                <th className="text-left py-2">Name</th>
                <th className="text-right py-2">Shares</th>
                <th className="text-right py-2">Avg Cost</th>
                <th className="text-right py-2">Current Price</th>
                <th className="text-right py-2">Market Value</th>
                <th className="text-right py-2">Gain/Loss</th>
                <th className="text-right py-2">Return</th>
              </tr>
            </thead>
            <tbody>
              {portfolio.map((investment) => (
                <tr key={investment.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="py-2 font-semibold">{investment.symbol}</td>
                  <td className="py-2">{investment.name}</td>
                  <td className="py-2 text-right">{investment.quantity}</td>
                  <td className="py-2 text-right">${investment.averageCost.toFixed(2)}</td>
                  <td className="py-2 text-right">${investment.currentPrice.toFixed(2)}</td>
                  <td className="py-2 text-right">${investment.marketValue.toLocaleString()}</td>
                  <td className={`py-2 text-right ${investment.gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ${investment.gainLoss.toFixed(2)}
                  </td>
                  <td className={`py-2 text-right ${investment.gainLossPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {investment.gainLossPercent.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Watchlist */}
      {watchlist.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-xl font-bold mb-4">Watchlist</h3>
          {watchlist.map((list) => (
            <div key={list.id} className="mb-4">
              <h4 className="font-semibold mb-2">{list.name}</h4>
              <div className="flex flex-wrap gap-2">
                {list.symbols.map((symbol) => (
                  <span
                    key={symbol}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                  >
                    {symbol}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Sector Performance */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-xl font-bold mb-4">Sector Performance</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {sectorPerformance.slice(0, 8).map((sector) => (
            <div key={sector.sector} className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">{sector.sector}</p>
              <p className={`text-lg font-semibold ${sector.performance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {sector.performance >= 0 ? '+' : ''}{sector.performance.toFixed(2)}%
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
