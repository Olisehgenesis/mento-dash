import { ReserveData, AssetBalance, Chain, ReserveAddressConfig } from '../types';
import { RESERVE_ADDRESS_CONFIGS } from '../config/addresses';
import { DuneApiService } from './duneApi';

export class ReserveDataService {
  private static instance: ReserveDataService;
  private duneService: DuneApiService;
  
  public static getInstance(): ReserveDataService {
    if (!ReserveDataService.instance) {
      ReserveDataService.instance = new ReserveDataService();
    }
    return ReserveDataService.instance;
  }

  constructor() {
    this.duneService = DuneApiService.getInstance();
  }

  async fetchReserveData(): Promise<ReserveData> {
    try {
      // Fetch real data from Dune Analytics
      return await this.duneService.fetchReserveData();
    } catch (error) {
      console.error('Error fetching reserve data:', error);
      throw new Error('Failed to fetch reserve data from Dune Analytics');
    }
  }

  async fetchAssetPrices(): Promise<Record<string, number>> {
    try {
      // This would fetch from CoinGecko API or similar
      // For now, we'll get prices from the Dune data itself
      const reserveData = await this.fetchReserveData();
      const prices: Record<string, number> = {};
      
      reserveData.assets.forEach(asset => {
        if (asset.balance && parseFloat(asset.balance) > 0) {
          const balance = parseFloat(asset.balance);
          prices[asset.symbol] = asset.usdValue / balance;
        }
      });
      
      return prices;
    } catch (error) {
      console.error('Error fetching asset prices:', error);
      throw new Error('Failed to fetch asset prices');
    }
  }

  getReserveAddresses(): ReserveAddressConfig[] {
    return RESERVE_ADDRESS_CONFIGS;
  }

  async getProtocolBreakdown(): Promise<{ protocol: string; usdValue: number; assets: AssetBalance[] }[]> {
    try {
      const data = await this.fetchReserveData();
      const protocolAssets = data.assets.filter(asset => asset.protocol);
      
      const protocolMap = new Map<string, AssetBalance[]>();
      
      protocolAssets.forEach(asset => {
        if (asset.protocol) {
          if (!protocolMap.has(asset.protocol)) {
            protocolMap.set(asset.protocol, []);
          }
          protocolMap.get(asset.protocol)!.push(asset);
        }
      });
      
      return Array.from(protocolMap.entries()).map(([protocol, assets]) => ({
        protocol,
        usdValue: assets.reduce((sum, asset) => sum + asset.usdValue, 0),
        assets,
      }));
    } catch (error) {
      console.error('Error getting protocol breakdown:', error);
      throw new Error('Failed to get protocol breakdown');
    }
  }

  async getChainComparison(): Promise<any> {
    try {
      return await this.duneService.fetchChainComparison();
    } catch (error) {
      console.error('Error fetching chain comparison:', error);
      throw new Error('Failed to fetch chain comparison');
    }
  }

  async getHistoricalTrends(): Promise<any> {
    try {
      return await this.duneService.fetchHistoricalTrends();
    } catch (error) {
      console.error('Error fetching historical trends:', error);
      throw new Error('Failed to fetch historical trends');
    }
  }
} 