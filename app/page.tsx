'use client';

import { useState, useEffect } from 'react';
import { ReserveDataService } from '../services/reserveData';
import { ReserveData, Chain } from '../types';
import Header from '../components/Header';
import OverviewCards from '../components/OverviewCards';
import AssetBreakdown from '../components/AssetBreakdown';
import ChainComparison from '../components/ChainComparison';
import ProtocolBreakdown from '../components/ProtocolBreakdown';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Dashboard() {
  const [reserveData, setReserveData] = useState<ReserveData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const service = ReserveDataService.getInstance();
        const data = await service.fetchReserveData();
        setReserveData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data from Dune Analytics');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="mb-4">
            <svg className="mx-auto h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Dashboard</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="text-sm text-gray-500 space-y-2">
            <p>Please ensure:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Dune Analytics queries are deployed and accessible</li>
              <li>API key is configured correctly</li>
              <li>Query IDs are updated in the configuration</li>
            </ul>
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-celo-primary text-white rounded-lg hover:bg-celo-primary/90 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!reserveData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-600 mb-4">No Data Available</h2>
          <p className="text-gray-500">Unable to load reserve data from Dune Analytics</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Mento Reserve Dashboard
          </h1>
          <p className="text-gray-600">
            Real-time visualization of Mento's reserve holdings across Celo and Ethereum
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Last updated: {new Date(reserveData.lastUpdated).toLocaleString()}
          </p>
          <div className="mt-2 flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-600 font-medium">Live Data from Dune Analytics</span>
          </div>
        </div>

        <OverviewCards data={reserveData} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <AssetBreakdown data={reserveData} />
          <ChainComparison data={reserveData} />
        </div>
        
        <ProtocolBreakdown />
      </main>
    </div>
  );
} 