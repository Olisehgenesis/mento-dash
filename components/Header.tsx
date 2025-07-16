import { TrendingUp, Shield, Globe } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-celo-primary to-celo-secondary rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Mento Reserve</span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#overview" className="text-gray-600 hover:text-celo-primary transition-colors">
              Overview
            </a>
            <a href="#assets" className="text-gray-600 hover:text-celo-primary transition-colors">
              Assets
            </a>
            <a href="#chains" className="text-gray-600 hover:text-celo-primary transition-colors">
              Chains
            </a>
            <a href="#protocols" className="text-gray-600 hover:text-celo-primary transition-colors">
              Protocols
            </a>
          </nav>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Globe className="w-4 h-4" />
              <span>Live Data</span>
            </div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </header>
  );
} 