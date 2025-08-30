import {
  Investment,
  InvestmentQuote
} from '../types/index';
import {
  InvestopediaQuote,
  MarketIndex,
  SectorPerformance,
  Watchlist,
  StockScreener,
  ScreenerResult,
  ETFInfo,
  CryptoCurrency,
  InvestmentAlert,
  RiskProfile
} from '../types/investments';

// Investment Service Class
export class InvestmentService {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string = process.env.ALPHA_VANTAGE_API_KEY || '') {
    this.apiKey = apiKey;
    this.baseUrl = 'https://www.alphavantage.co/query';
  }

  // Get real-time stock quote
  async getQuote(symbol: string): Promise<InvestmentQuote> {
    try {
      const response = await fetch(
        `${this.baseUrl}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${this.apiKey}`
      );

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();

      if (data['Global Quote']) {
        const quote = data['Global Quote'];
        return {
          symbol: quote['01. symbol'],
          name: quote['02. name'] || symbol,
          price: parseFloat(quote['05. price']),
          change: parseFloat(quote['09. change']),
          changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
          volume: parseInt(quote['06. volume']),
          lastUpdated: new Date()
        };
      } else {
        throw new Error('Quote not found');
      }
    } catch (error) {
      console.error('Error fetching quote:', error);
      // Return mock data for development
      return this.getMockQuote(symbol);
    }
  }

  // Get multiple quotes
  async getQuotes(symbols: string[]): Promise<InvestmentQuote[]> {
    const quotes: InvestmentQuote[] = [];
    for (const symbol of symbols) {
      try {
        const quote = await this.getQuote(symbol);
        quotes.push(quote);
        // Rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`Error fetching quote for ${symbol}:`, error);
      }
    }
    return quotes;
  }

  // Get market indices
  async getMarketIndices(): Promise<MarketIndex[]> {
    const indices = ['DJI', 'IXIC', 'GSPC']; // Dow, Nasdaq, S&P 500

    try {
      const quotes = await this.getQuotes(indices);
      return quotes.map(quote => ({
        symbol: quote.symbol,
        name: this.getIndexName(quote.symbol),
        value: quote.price,
        change: quote.change,
        changePercent: quote.changePercent,
        lastUpdated: quote.lastUpdated
      }));
    } catch (error) {
      console.error('Error fetching market indices:', error);
      return this.getMockIndices();
    }
  }

  // Get sector performance
  async getSectorPerformance(): Promise<SectorPerformance[]> {
    // This would typically come from a financial API
    // For now, return mock data
    return this.getMockSectorPerformance();
  }

  // Search for stocks
  async searchStocks(query: string): Promise<any[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}?function=SYMBOL_SEARCH&keywords=${query}&apikey=${this.apiKey}`
      );

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();

      if (data.bestMatches) {
        return data.bestMatches.map((match: any) => ({
          symbol: match['1. symbol'],
          name: match['2. name'],
          type: match['3. type'],
          region: match['4. region'],
          marketOpen: match['5. marketOpen'],
          marketClose: match['6. marketClose'],
          timezone: match['7. timezone'],
          currency: match['8. currency'],
          matchScore: match['9. matchScore']
        }));
      }

      return [];
    } catch (error) {
      console.error('Error searching stocks:', error);
      return [];
    }
  }

  // Get company overview
  async getCompanyOverview(symbol: string): Promise<any> {
    try {
      const response = await fetch(
        `${this.baseUrl}?function=OVERVIEW&symbol=${symbol}&apikey=${this.apiKey}`
      );

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      return {
        symbol: data.Symbol,
        name: data.Name,
        description: data.Description,
        sector: data.Sector,
        industry: data.Industry,
        marketCap: parseFloat(data.MarketCapitalization),
        peRatio: parseFloat(data.PERatio),
        dividendYield: parseFloat(data.DividendYield),
        beta: parseFloat(data.Beta),
        eps: parseFloat(data.EPS),
        revenue: parseFloat(data.RevenueTTM),
        profitMargin: parseFloat(data.ProfitMargin)
      };
    } catch (error) {
      console.error('Error fetching company overview:', error);
      return this.getMockCompanyOverview(symbol);
    }
  }

  // Get historical data
  async getHistoricalData(symbol: string, period: string = '1month'): Promise<any[]> {
    try {
      const functionName = period === '1day' ? 'TIME_SERIES_INTRADAY' : 'TIME_SERIES_DAILY';
      const interval = period === '1day' ? '5min' : '';

      let url = `${this.baseUrl}?function=${functionName}&symbol=${symbol}&apikey=${this.apiKey}`;
      if (interval) {
        url += `&interval=${interval}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      const timeSeriesKey = Object.keys(data).find(key => key.includes('Time Series'));

      if (timeSeriesKey) {
        const timeSeries = data[timeSeriesKey];
        return Object.entries(timeSeries).map(([date, values]: [string, any]) => ({
          date,
          open: parseFloat(values['1. open']),
          high: parseFloat(values['2. high']),
          low: parseFloat(values['3. low']),
          close: parseFloat(values['4. close']),
          volume: parseInt(values['5. volume'])
        }));
      }

      return [];
    } catch (error) {
      console.error('Error fetching historical data:', error);
      return this.getMockHistoricalData(symbol);
    }
  }

  // Private helper methods
  private getIndexName(symbol: string): string {
    const names: Record<string, string> = {
      'DJI': 'Dow Jones Industrial Average',
      'IXIC': 'NASDAQ Composite',
      'GSPC': 'S&P 500'
    };
    return names[symbol] || symbol;
  }

  private getMockQuote(symbol: string): InvestmentQuote {
    return {
      symbol,
      name: `${symbol} Corporation`,
      price: Math.random() * 1000 + 10,
      change: (Math.random() - 0.5) * 20,
      changePercent: (Math.random() - 0.5) * 10,
      volume: Math.floor(Math.random() * 10000000),
      lastUpdated: new Date()
    };
  }

  private getMockIndices(): MarketIndex[] {
    return [
      {
        symbol: 'DJI',
        name: 'Dow Jones Industrial Average',
        value: 35000 + Math.random() * 5000,
        change: (Math.random() - 0.5) * 500,
        changePercent: (Math.random() - 0.5) * 2,
        lastUpdated: new Date()
      },
      {
        symbol: 'IXIC',
        name: 'NASDAQ Composite',
        value: 14000 + Math.random() * 2000,
        change: (Math.random() - 0.5) * 200,
        changePercent: (Math.random() - 0.5) * 2,
        lastUpdated: new Date()
      },
      {
        symbol: 'GSPC',
        name: 'S&P 500',
        value: 4500 + Math.random() * 500,
        change: (Math.random() - 0.5) * 50,
        changePercent: (Math.random() - 0.5) * 2,
        lastUpdated: new Date()
      }
    ];
  }

  private getMockSectorPerformance(): SectorPerformance[] {
    const sectors = [
      'Technology', 'Healthcare', 'Financials', 'Consumer Discretionary',
      'Communication Services', 'Industrials', 'Energy', 'Utilities',
      'Real Estate', 'Materials', 'Consumer Staples'
    ];

    return sectors.map(sector => ({
      sector,
      performance: (Math.random() - 0.5) * 4,
      marketCap: Math.random() * 1000000000000,
      volume: Math.random() * 1000000000
    }));
  }

  private getMockCompanyOverview(symbol: string) {
    return {
      symbol,
      name: `${symbol} Corporation`,
      description: `A leading company in the ${symbol} industry.`,
      sector: 'Technology',
      industry: 'Software',
      marketCap: Math.random() * 1000000000,
      peRatio: Math.random() * 50,
      dividendYield: Math.random() * 5,
      beta: Math.random() * 2,
      eps: Math.random() * 10,
      revenue: Math.random() * 10000000000,
      profitMargin: Math.random() * 20
    };
  }

  private getMockHistoricalData(symbol: string): any[] {
    const data = [];
    const basePrice = Math.random() * 1000 + 10;

    for (let i = 30; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);

      const change = (Math.random() - 0.5) * 20;
      const open = basePrice + change;
      const close = open + (Math.random() - 0.5) * 10;
      const high = Math.max(open, close) + Math.random() * 5;
      const low = Math.min(open, close) - Math.random() * 5;

      data.push({
        date: date.toISOString().split('T')[0],
        open: Math.max(0, open),
        high: Math.max(0, high),
        low: Math.max(0, low),
        close: Math.max(0, close),
        volume: Math.floor(Math.random() * 10000000)
      });
    }

    return data;
  }
}

// Export singleton instance
export const investmentService = new InvestmentService();
