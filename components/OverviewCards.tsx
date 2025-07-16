import { ReserveData } from '../types';
import { DollarSign, TrendingUp, Shield, Globe } from 'lucide-react';

interface OverviewCardsProps {
  data: ReserveData;
}

export default function OverviewCards({ data }: OverviewCardsProps) {
  const formatUSD = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const cards = [
    {
      title: 'Total Reserve Value',
      value: formatUSD(data.totalUsdValue),
      icon: DollarSign,
      color: 'bg-gradient-to-br from-green-500 to-green-600',
      change: '+2.5%',
      changeType: 'positive' as const,
    },
    {
      title: 'Celo Chain',
      value: formatUSD(data.celoUsdValue),
      icon: Shield,
      color: 'bg-gradient-to-br from-celo-primary to-celo-secondary',
      change: '+1.8%',
      changeType: 'positive' as const,
    },
    {
      title: 'Ethereum Chain',
      value: formatUSD(data.ethereumUsdValue),
      icon: Globe,
      color: 'bg-gradient-to-br from-ethereum-primary to-blue-600',
      change: '+3.2%',
      changeType: 'positive' as const,
    },
    {
      title: 'Assets Count',
      value: data.assets.length.toString(),
      icon: TrendingUp,
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      change: '+2',
      changeType: 'neutral' as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className={`text-sm font-medium ${
                card.changeType === 'positive' ? 'text-green-600' : 
                card.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
              }`}>
                {card.change}
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">{card.title}</h3>
            <p className="text-2xl font-bold text-gray-900">{card.value}</p>
          </div>
        );
      })}
    </div>
  );
} 