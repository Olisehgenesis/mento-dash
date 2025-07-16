import { useState, useEffect } from 'react';
import { ReserveData, Chain } from '../types';
import { ReserveDataService } from '../services/reserveData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChainComparisonProps {
  data: ReserveData;
}

export default function ChainComparison({ data }: ChainComparisonProps) {
  const [chainData, setChainData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChainData = async () => {
      try {
        setLoading(true);
        const service = ReserveDataService.getInstance();
        const duneData = await service.getChainComparison();
        setChainData(duneData);
      } catch (err) {
        console.error('Error fetching chain comparison:', err);
        // Fallback to calculated data from props
        const fallbackData = [
          {
            chain: 'CELO',
            total_value: data.celoUsdValue,
            percentage_of_total: ((data.celoUsdValue / data.totalUsdValue) * 100).toFixed(1),
            asset_count: data.assets.filter(asset => asset.chain === Chain.CELO).length,
            color: '#35D07F'
          },
          {
            chain: 'ETHEREUM',
            total_value: data.ethereumUsdValue,
            percentage_of_total: ((data.ethereumUsdValue / data.totalUsdValue) * 100).toFixed(1),
            asset_count: data.assets.filter(asset => asset.chain === Chain.ETHEREUM).length,
            color: '#627EEA'
          }
        ];
        setChainData(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchChainData();
  }, [data]);

  const formatUSD = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{label}</p>
          <p className="text-gray-600">{formatUSD(data.value)}</p>
          <p className="text-sm text-gray-500">{data.payload.asset_count} assets</p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-celo-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Chain Distribution</h2>
        <p className="text-gray-600">Reserve value distribution across blockchains</p>
      </div>

      <div className="h-80 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chainData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="chain" />
            <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="total_value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {chainData.map((chain) => (
          <div key={chain.chain} className="p-4 rounded-lg border" style={{ borderColor: chain.color }}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900">{chain.chain}</h3>
              <div 
                className="w-4 h-4 rounded-full" 
                style={{ backgroundColor: chain.color }}
              ></div>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">
              {formatUSD(chain.total_value)}
            </p>
            <p className="text-sm text-gray-600">
              {chain.percentage_of_total}% of total • {chain.asset_count} assets
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-2">Key Insights</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Celo holds {chainData.find(c => c.chain === 'CELO')?.percentage_of_total || 0}% of total reserve value</li>
          <li>• Ethereum holds {chainData.find(c => c.chain === 'ETHEREUM')?.percentage_of_total || 0}% of total reserve value</li>
          <li>• Cross-chain diversification reduces single-chain risk</li>
        </ul>
      </div>
    </div>
  );
} 