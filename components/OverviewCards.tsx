import React from 'react';
import { TrendingUp, Layers, Globe } from 'lucide-react';

interface OverviewCardsProps {
  summary: {
    totalTokens: number;
    totalApps: number;
    totalNFTs: number;
    grandTotal: number;
    assetsList: string[];
  };
  chainBreakdown: Array<{ chain: string; value: number }>;
  assetCount: number;
}

export default function OverviewCards({ summary, chainBreakdown, assetCount }: OverviewCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-14 mb-16">
      <div className="glass rounded-3xl p-16 flex flex-col items-center shadow-2xl hover:scale-[1.04] transition-transform duration-200 min-h-[320px] min-w-[320px]">
        <div className="flex items-center space-x-5 mb-2">
          <TrendingUp className="w-16 h-16 text-emerald-500" />
          <span className="text-slate-500 text-lg font-semibold">Total Reserve Value</span>
        </div>
        <div className="text-5xl font-extrabold text-slate-800">${summary.grandTotal?.toLocaleString(undefined, { maximumFractionDigits: 0 }) ?? '--'}</div>
      </div>
      <div className="glass rounded-3xl p-16 flex flex-col items-center shadow-2xl hover:scale-[1.04] transition-transform duration-200 min-h-[320px] min-w-[320px]">
        <div className="flex items-center space-x-5 mb-2">
          <Layers className="w-16 h-16 text-orange-400" />
          <span className="text-slate-500 text-lg font-semibold">Assets Tracked</span>
        </div>
        <div className="text-5xl font-extrabold text-slate-800 mb-2">{assetCount}</div>
        <div className="flex flex-wrap justify-center gap-2 mt-2 max-w-xs">
          {(summary.assetsList || []).map((symbol: string, i: number) => (
            <span key={symbol} className={`px-3 py-1 rounded-full text-xs font-semibold ${['bg-emerald-100 text-emerald-700','bg-orange-100 text-orange-700','bg-purple-100 text-purple-700','bg-teal-100 text-teal-700','bg-pink-100 text-pink-700','bg-blue-100 text-blue-700','bg-yellow-100 text-yellow-700','bg-gray-100 text-gray-700'][i % 8]}`}>{symbol}</span>
          ))}
        </div>
      </div>
      <div className="glass rounded-3xl p-16 flex flex-col items-center shadow-2xl hover:scale-[1.04] transition-transform duration-200 min-h-[320px] min-w-[320px]">
        <div className="flex items-center space-x-5 mb-2">
          <Globe className="w-16 h-16 text-purple-400" />
          <span className="text-slate-500 text-lg font-semibold">By Chain</span>
        </div>
        <div className="flex flex-col items-center gap-2 mt-2">
          {chainBreakdown.map((c) => (
            <div key={c.chain} className="flex items-center gap-2 text-base font-semibold text-slate-700">
              <span className={`px-2 py-1 rounded-full text-xs font-bold ${c.chain.toLowerCase().includes('eth') ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}`}>{c.chain}</span>
              <span className="text-slate-500 text-sm">${c.value.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 