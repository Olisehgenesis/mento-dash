import axios from 'axios';
import { ReserveData, AssetBalance, Chain } from '../types';

// Dune Analytics API configuration
const DUNE_API_BASE = 'https://api.dune.com/api/v1';
const DUNE_API_KEY = process.env.NEXT_PUBLIC_DUNE_API_KEY || '';

// Query IDs from Dune (you'll need to replace these with actual query IDs after creating them)
const QUERY_IDS = {
  reserve_overview: '1234567', // Replace with actual query ID
  asset_breakdown: '1234568',  // Replace with actual query ID
  chain_comparison: '1234569', // Replace with actual query ID
  protocol_exposure: '1234570', // Replace with actual query ID
  historical_trends: '1234571'  // Replace with actual query ID
};

export class DuneApiService {
  private static instance: DuneApiService;
  
  public static getInstance(): DuneApiService {
    if (!DuneApiService.instance) {
      DuneApiService.instance = new DuneApiService();
    }
    return DuneApiService.instance;
  }

  private async executeQuery(queryId: string): Promise<any> {
    try {
      // Execute the query
      const executeResponse = await axios.post(
        `${DUNE_API_BASE}/query/${queryId}/execute`,
        {},
        {
          headers: {
            'X-Dune-API-Key': DUNE_API_KEY,
            'Content-Type': 'application/json'
          }
        }
      );

      const executionId = executeResponse.data.execution_id;

      // Poll for results
      let attempts = 0;
      const maxAttempts = 30;
      
      while (attempts < maxAttempts) {
        const statusResponse = await axios.get(
          `${DUNE_API_BASE}/execution/${executionId}/status`,
          {
            headers: {
              'X-Dune-API-Key': DUNE_API_KEY
            }
          }
        );

        if (statusResponse.data.state === 'QUERY_STATE_COMPLETED') {
          const resultsResponse = await axios.get(
            `${DUNE_API_BASE}/execution/${executionId}/results`,
            {
              headers: {
                'X-Dune-API-Key': DUNE_API_KEY
              }
            }
          );
          
          return resultsResponse.data.result.rows;
        }

        if (statusResponse.data.state === 'QUERY_STATE_FAILED') {
          throw new Error(`Query execution failed: ${statusResponse.data.error}`);
        }

        // Wait 2 seconds before next attempt
        await new Promise(resolve => setTimeout(resolve, 2000));
        attempts++;
      }

      throw new Error('Query execution timeout');
    } catch (error) {
      console.error('Dune API error:', error);
      throw new Error('Failed to fetch data from Dune Analytics');
    }
  }

  async fetchReserveData(): Promise<ReserveData> {
    try {
      // Fetch asset breakdown data
      const assetData = await this.executeQuery(QUERY_IDS.asset_breakdown);
      
      // Process the data into our format
      const assets: AssetBalance[] = assetData.map((row: any) => ({
        symbol: row.asset,
        balance: row.total_balance?.toString() || '0',
        decimals: this.getAssetDecimals(row.asset),
        usdValue: row.total_usd_value || 0,
        chain: row.chain === 'CELO' ? Chain.CELO : Chain.ETHEREUM,
        protocol: row.protocol || undefined
      }));

      // Calculate totals
      const celoAssets = assets.filter(asset => asset.chain === Chain.CELO);
      const ethereumAssets = assets.filter(asset => asset.chain === Chain.ETHEREUM);
      
      const celoUsdValue = celoAssets.reduce((sum, asset) => sum + asset.usdValue, 0);
      const ethereumUsdValue = ethereumAssets.reduce((sum, asset) => sum + asset.usdValue, 0);
      const totalUsdValue = celoUsdValue + ethereumUsdValue;

      return {
        totalUsdValue,
        celoUsdValue,
        ethereumUsdValue,
        assets,
        lastUpdated: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error fetching reserve data from Dune:', error);
      throw new Error('Failed to fetch reserve data from Dune Analytics');
    }
  }

  async fetchChainComparison(): Promise<any> {
    try {
      const data = await this.executeQuery(QUERY_IDS.chain_comparison);
      return data;
    } catch (error) {
      console.error('Error fetching chain comparison:', error);
      throw new Error('Failed to fetch chain comparison data');
    }
  }

  async fetchProtocolExposure(): Promise<any> {
    try {
      const data = await this.executeQuery(QUERY_IDS.protocol_exposure);
      return data;
    } catch (error) {
      console.error('Error fetching protocol exposure:', error);
      throw new Error('Failed to fetch protocol exposure data');
    }
  }

  async fetchHistoricalTrends(): Promise<any> {
    try {
      const data = await this.executeQuery(QUERY_IDS.historical_trends);
      return data;
    } catch (error) {
      console.error('Error fetching historical trends:', error);
      throw new Error('Failed to fetch historical trends data');
    }
  }

  private getAssetDecimals(asset: string): number {
    const decimalsMap: { [key: string]: number } = {
      'CELO': 18,
      'ETH': 18,
      'WBTC': 8,
      'WETH': 18,
      'USDC': 6,
      'USDT': 6,
      'EURC': 6,
      'axlUSDC': 6,
      'axlEUROC': 6,
      'USDGLO': 6,
      'stEUR': 6,
      'stETH': 18,
      'sDAI': 18
    };
    
    return decimalsMap[asset] || 18;
  }
} 