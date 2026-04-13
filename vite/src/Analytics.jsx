function Analytics({ setActivePage, activeIdea }) {
  const analytics = activeIdea?.analysis?.analytics || {};

  return (
    <div className="text-white p-2">

      

      {/* 🔥 TITLE */}
      <h1 className="text-2xl font-bold text-purple-300 mb-6">
        Analytics Dashboard 📊
      </h1>

      {/* 💎 GRID */}
      <div className="p-6 rounded-2xl 
      bg-gradient-to-br from-purple-900/20 via-black/40 to-purple-900/20
      border border-purple-500/20 backdrop-blur-md shadow-lg">
          
        <h2 className="text-xl font-semibold text-purple-300 mb-4">
            📈 Metrics to Track
        </h2>
        <p className="text-gray-300 mb-8 whitespace-pre-wrap leading-relaxed bg-black/20 p-4 border border-white/5 rounded-xl">
            {analytics.metricsToTrack || "Submit your idea to discover which specific KPIs you should be measuring."}
        </p>

        <h2 className="text-xl font-semibold text-purple-300 mb-4">
            🕵️ Competitor Analysis
        </h2>
        <p className="text-gray-300 whitespace-pre-wrap leading-relaxed bg-black/20 p-4 border border-white/5 rounded-xl">
            {analytics.competitorAnalysis || "Submit your idea to see where competitors are failing."}
        </p>

      </div>

    </div>
  );
}

export default Analytics;