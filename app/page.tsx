'use client';

import { useState, useEffect } from 'react';
import { ReserveData, Chain } from '../types';
import OverviewCards from '../components/OverviewCards';
import AssetBreakdown from '../components/AssetBreakdown';
import ChainComparison from '../components/ChainComparison';
import ProtocolBreakdown from '../components/ProtocolBreakdown';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Page() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch('/api/mentoReserve')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch reserve data');
        return res.json();
      })
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Failed to fetch reserve data');
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center gradient-bg">
      <LoadingSpinner />
    </div>
  );
  if (error) return (
    <div className="min-h-screen flex flex-col items-center justify-center gradient-bg">
      <div className="bg-red-600/90 border-2 border-red-800 text-white p-10 rounded-2xl shadow-2xl text-center max-w-xl">
        <h2 className="text-3xl font-bold mb-4">Error</h2>
        <p className="text-lg font-semibold">{error}</p>
      </div>
    </div>
  );

  // Prepare data for components
  const summary = data?.summary || {};
  const tokens = (data?.tokens || []).map((t: any) => ({ symbol: t.symbol, balanceUSD: t.balanceUSD }));
  const assetCount = tokens.length;
  // Chain breakdown: sum by network name
  const chainMap: Record<string, number> = {};
  (data?.tokens || []).forEach((t: any) => {
    if (!chainMap[t.network]) chainMap[t.network] = 0;
    chainMap[t.network] += t.balanceUSD;
  });
  (data?.protocols || []).forEach((p: any) => {
    if (!chainMap[p.network]) chainMap[p.network] = 0;
    chainMap[p.network] += p.totalValue;
  });
  const chainBreakdown = Object.entries(chainMap).map(([chain, value]) => ({ chain, value }));
  const protocols = data?.protocols || [];

  return (
    <div className="min-h-screen gradient-bg pb-8">
      <main className="w-full max-w-[1800px] mx-auto px-[5vw] md:px-[10vw] pt-20">
        <h1 className="text-6xl md:text-7xl font-extrabold mb-20 text-white drop-shadow tracking-tight text-center">Mento Reserve Dashboard</h1>
        <OverviewCards summary={summary} chainBreakdown={chainBreakdown} assetCount={assetCount} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-20 mt-10">
          <AssetBreakdown tokens={tokens} />
          <ChainComparison chainBreakdown={chainBreakdown} />
        </div>
        <div className="mt-20">
          <ProtocolBreakdown protocols={protocols} />
        </div>
      </main>
    </div>
  );
} 