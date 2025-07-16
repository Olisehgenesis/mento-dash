import { ReserveData, AssetBalance } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface AssetBreakdownProps {
  data: ReserveData;
}

export default function AssetBreakdown({ data }: AssetBreakdownProps) {
  // Aggregate assets by symbol
  const assetMap = new Map<string, number>();
  
  data.assets.forEach(asset => {
    const currentValue = assetMap.get(asset.symbol) || 0;
    assetMap.set(asset.symbol, currentValue + asset.usdValue);
  });

  const chartData = Array.from(assetMap.entries())
    .map(([symbol, value]) => ({
      name: symbol,
      value: Math.round(value),
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10); // Top 10 assets

  const COLORS = [
    '#35D07F', '#FBCC5C', '#627EEA', '#FF6B6B', '#4ECDC4',
    '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'
  ];

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
      const percentage = ((data.value / data.total) * 100).toFixed(1);
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{data.name}</p>
          <p className="text-gray-600">{formatUSD(data.value)}</p>
          <p className="text-sm text-gray-500">{percentage}% of total</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Asset Breakdown</h2>
        <p className="text-gray-600">Distribution of reserve assets by value</p>
      </div>

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

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Top Assets</h3>
        <div className="space-y-2">
          {chartData.slice(0, 5).map((asset, index) => (
            <div key={asset.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></div>
                <span className="font-medium text-gray-900">{asset.name}</span>
              </div>
              <span className="text-gray-600">{formatUSD(asset.value)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 