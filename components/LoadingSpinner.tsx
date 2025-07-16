export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <div className="glass rounded-full h-24 w-24 flex items-center justify-center shadow-lg">
        <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-slate-300 border-t-4 border-slate-200 border-opacity-80"></div>
      </div>
      <p className="text-slate-700 text-2xl font-medium">Loading reserve data...</p>
    </div>
  );
} 