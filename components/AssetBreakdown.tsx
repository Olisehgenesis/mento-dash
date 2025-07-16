import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AssetBreakdownProps {
  tokens: Array<{ symbol: string; balanceUSD: number }>;
}

const COLORS = [
  '#34d399', '#fbbf24', '#a78bfa', '#38bdf8', '#f472b6', '#f87171', '#10b981', '#facc15', '#818cf8', '#fb7185',
];

export default function AssetBreakdown({ tokens }: AssetBreakdownProps) {
  const [selected, setSelected] = useState<null | { name: string; value: number; percent: number }>(null);
  const data = tokens.filter(t => t.balanceUSD > 0).map(t => ({ name: t.symbol, value: t.balanceUSD }));
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const handlePieClick = (_: any, index: number) => {
    const d = data[index];
    setSelected({
      name: d.name,
      value: d.value,
      percent: total ? (d.value / total) * 100 : 0,
    });
  };
  return (
    <div className="glass rounded-2xl shadow-lg p-10 flex flex-col items-center hover:scale-[1.02] transition-transform duration-200">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">Reserve Breakdown by Asset</h2>
      <ResponsiveContainer width="100%" height={360}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={130}
            label={({ name }) => name}
            stroke="#334155"
            strokeWidth={2}
            onClick={handlePieClick}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} cursor="pointer" />
            ))}
          </Pie>
          <Tooltip contentStyle={{ background: 'rgba(255,255,255,0.95)', border: 'none', borderRadius: 8, color: '#222' }} formatter={(value: number) => `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} />
          <Legend wrapperStyle={{ color: '#222' }} />
        </PieChart>
      </ResponsiveContainer>
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20" onClick={() => setSelected(null)}>
          <div className="rounded-3xl p-10 min-w-[320px] max-w-[90vw] shadow-2xl flex flex-col items-center relative" style={{ background: '#E7E3D4' }} onClick={e => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-2xl text-slate-500 hover:text-slate-800" onClick={() => setSelected(null)}>&times;</button>
            <h3 className="text-2xl font-bold mb-2 text-slate-800">{selected.name}</h3>
            <div className="text-3xl font-extrabold text-slate-700 mb-1">${selected.value.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
            <div className="text-base text-slate-600">{selected.percent.toFixed(1)}% of reserve</div>
          </div>
        </div>
      )}
    </div>
  );
} 