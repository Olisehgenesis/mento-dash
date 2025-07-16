import { TrendingUp, Shield, Globe } from 'lucide-react';

export default function Header() {
  return (
    <header className="glass gradient-bg shadow-lg border-b border-white/10 dark:border-slate-800/40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-celo-primary to-blue-500 rounded-xl flex items-center justify-center shadow glow">
                <Shield className="w-6 h-6 text-white animate-bounce" aria-label="Organization" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white drop-shadow">Mento Reserve</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#overview" className="text-white/80 hover:text-emerald-400 transition-colors font-medium">Overview</a>
            <a href="#assets" className="text-white/80 hover:text-emerald-400 transition-colors font-medium">Assets</a>
            <a href="#chains" className="text-white/80 hover:text-emerald-400 transition-colors font-medium">Chains</a>
            <a href="#protocols" className="text-white/80 hover:text-emerald-400 transition-colors font-medium">Protocols</a>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="px-3 py-1 rounded-lg bg-emerald-500/80 hover:bg-emerald-400 text-white font-semibold shadow transition-all backdrop-blur-md border border-white/10">Export</button>
            <div className="flex items-center space-x-2 text-sm text-white/80">
              <Globe className="w-4 h-4 text-blue-300 animate-spin-slow" aria-label="Live Data" />
              <span>Live Data</span>
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse ml-1" aria-label="Live status"></span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 
// Add a custom slow spin animation for Globe in your global CSS if not present:
// .animate-spin-slow { animation: spin 2s linear infinite; } 