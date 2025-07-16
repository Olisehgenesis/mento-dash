import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';

interface ChainComparisonProps {
  chainBreakdown: Array<{ chain: string; value: number }>;
}

export default function ChainComparison({ chainBreakdown }: ChainComparisonProps) {
  return (
    <div className="glass rounded-2xl shadow-lg p-10 flex flex-col items-center hover:scale-[1.02] transition-transform duration-200">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">Reserve by Chain</h2>
      <ResponsiveContainer width="100%" height={360}>
        <BarChart data={chainBreakdown}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="chain" stroke="#222" tick={{ fill: '#222', fontSize: 18 }} />
          <YAxis tickFormatter={v => `$${v / 1e6}M`} stroke="#222" tick={{ fill: '#222', fontSize: 18 }} />
          <Tooltip contentStyle={{ background: 'rgba(255,255,255,0.95)', border: 'none', borderRadius: 8, color: '#222' }} formatter={(value: number) => `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} />
          <Legend wrapperStyle={{ color: '#222', fontSize: 18 }} />
          <Bar dataKey="value" fill="#14b8a6" name="USD Value" barSize={48} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
} 