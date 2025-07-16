import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';

interface Protocol {
  name: string;
  category: string;
  network: string;
  totalValue: number;
  positionCount: number;
}

interface ProtocolBreakdownProps {
  protocols: Protocol[];
}

export default function ProtocolBreakdown({ protocols }: ProtocolBreakdownProps) {
  // No filtering: show all protocols, even those with small values
  const data = protocols.map(p => ({ name: p.name, value: p.totalValue }));

  // Helper for category badge color
  const badgeColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'lending': return 'bg-teal-200 text-teal-800';
      case 'dex': return 'bg-orange-200 text-orange-800';
      case 'staking': return 'bg-purple-200 text-purple-800';
      default: return 'bg-slate-200 text-slate-800';
    }
  };

  const rowBorderColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'lending': return 'border-l-4 border-teal-400';
      case 'dex': return 'border-l-4 border-orange-400';
      case 'staking': return 'border-l-4 border-purple-400';
      default: return 'border-l-4 border-slate-300';
    }
  };

  return (
    <div className="glass rounded-2xl shadow-lg p-10 mt-12 flex flex-col items-center hover:scale-[1.01] transition-transform duration-200">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">Reserve by Protocol</h2>
      <ResponsiveContainer width="100%" height={360}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis type="number" tickFormatter={v => `$${v / 1e6}M`} stroke="#222" tick={{ fill: '#222', fontSize: 18 }} />
          <YAxis dataKey="name" type="category" width={160} stroke="#222" tick={{ fill: '#222', fontSize: 18 }} />
          <Tooltip contentStyle={{ background: 'rgba(255,255,255,0.95)', border: 'none', borderRadius: 8, color: '#222' }} formatter={(value: number) => `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} />
          <Legend wrapperStyle={{ color: '#222', fontSize: 18 }} />
          <Bar dataKey="value" fill="#14b8a6" name="USD Value" barSize={48} />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-10 w-full overflow-x-auto">
        <table className="min-w-full text-lg text-left rounded-xl overflow-hidden bg-white/90">
          <thead>
            <tr>
              <th className="px-5 py-4 text-slate-600">Protocol</th>
              <th className="px-5 py-4 text-slate-600">Category</th>
              <th className="px-5 py-4 text-slate-600">Network</th>
              <th className="px-5 py-4 text-slate-600">Value (USD)</th>
            </tr>
          </thead>
          <tbody>
            {protocols.map((p) => (
              <tr key={p.name} className={`border-t border-slate-200 hover:bg-slate-100 transition-colors ${rowBorderColor(p.category)}`}>
                <td className="px-5 py-4 font-semibold text-slate-800">{p.name}</td>
                <td className={`px-5 py-4`}><span className={`px-3 py-2 rounded-full text-base font-semibold ${badgeColor(p.category)}`}>{p.category}</span></td>
                <td className="px-5 py-4 text-blue-700 font-medium">{p.network}</td>
                <td className="px-5 py-4 text-slate-700 font-semibold">${p.totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 