import { useState, useEffect } from 'react';
import { ReserveDataService } from '../services/reserveData';
import { AssetBalance } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export default function ProtocolBreakdown() {
  const [protocolData, setProtocolData] = useState<{ protocol: string; usdValue: number; assets: AssetBalance[] }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProtocolData = async () => {
      try {
        setLoading(true);
        const service = ReserveDataService.getInstance();
        const data = await service.getProtocolBreakdown();
        setProtocolData(data);
      } catch (error) {
        console.error('Error fetching protocol data:', error);
        setError('Failed to fetch protocol data from Dune Analytics');
      } finally {
        setLoading(false);
      }
    };

    fetchProtocolData();
  }, []);

  const chartData = protocolData.map(item => ({
    name: item.protocol,
    value: Math.round(item.usdValue),
  }));

  const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];

  const formatUSD = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{data.name}</p>
          <p className="text-gray-600">{formatUSD(data.value)}</p>
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

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Protocol Breakdown</h2>
          <p className="text-gray-600">Assets held in DeFi protocols</p>
        </div>
        <div className="text-center py-12">
          <div className="text-red-500 mb-2">
            <svg className="mx-auto h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (protocolData.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Protocol Breakdown</h2>
          <p className="text-gray-600">Assets held in DeFi protocols</p>
        </div>
        <div className="text-center py-12">
          <p className="text-gray-500">No protocol data available from Dune Analytics</p>
        </div>
      </div>
    );
  }

  const totalProtocolValue = protocolData.reduce((sum, protocol) => sum + protocol.usdValue, 0);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Protocol Breakdown</h2>
        <p className="text-gray-600">Assets held in DeFi protocols for yield generation</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Protocol Details</h3>
            <p className="text-sm text-gray-600 mb-4">
              Total value in protocols: {formatUSD(totalProtocolValue)}
            </p>
          </div>

          <div className="space-y-4">
            {protocolData.map((protocol, index) => (
              <div key={protocol.protocol} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <h4 className="font-semibold text-gray-900">{protocol.protocol}</h4>
                  </div>
                  <span className="text-lg font-bold text-gray-900">
                    {formatUSD(protocol.usdValue)}
                  </span>
                </div>
                
                <div className="space-y-2">
                  {protocol.assets.map((asset) => (
                    <div key={`${protocol.protocol}-${asset.symbol}`} className="flex justify-between text-sm">
                      <span className="text-gray-600">{asset.symbol}</span>
                      <span className="text-gray-900">{formatUSD(asset.usdValue)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">Protocol Strategy</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Aave: Lending and borrowing for yield generation</li>
          <li>• Uniswap V3: Liquidity provision for trading fees</li>
          <li>• Diversified protocol exposure reduces smart contract risk</li>
        </ul>
      </div>
    </div>
  );
} 