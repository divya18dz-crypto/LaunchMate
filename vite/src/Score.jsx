function Score({ setActivePage, activeIdea }) {
  const score = activeIdea?.analysis?.score || {};

  return (
    <div className="text-white p-2">

      

      {/* 🔥 TITLE */}
      <h1 className="text-2xl font-bold text-purple-300 mb-4">
        Startup Score 📊
      </h1>

      {/* 💎 GLASS CARD */}
      <div className="p-6 rounded-2xl 
      bg-gradient-to-br from-purple-900/20 via-black/40 to-purple-900/20
      border border-purple-500/20 backdrop-blur-md shadow-lg">

        {/* SCORE */}
        <h2 className="text-4xl font-bold text-purple-300 mb-2">
          {score.total || 0} / 100
        </h2>

        <p className="text-gray-400 mb-4">
          {score.summary || "This rating determines viability and scalable interest."}
        </p>

        {/* BREAKDOWN */}
        <div className="space-y-3 text-sm text-gray-300 mt-6 bg-black/20 p-4 rounded-xl border border-white/5">
          <div className="flex justify-between">
            <span>💡 Innovation:</span> 
            <span className="font-semibold text-purple-300">{score.innovation || 0}/10</span>
          </div>
          <div className="flex justify-between">
            <span>📈 Market Demand:</span> 
            <span className="font-semibold text-purple-300">{score.marketDemand || 0}/10</span>
          </div>
          <div className="flex justify-between">
            <span>💰 Profit Potential:</span> 
            <span className="font-semibold text-purple-300">{score.profitPotential || 0}/10</span>
          </div>
          <div className="flex justify-between">
            <span>⚙️ Feasibility:</span> 
            <span className="font-semibold text-purple-300">{score.feasibility || 0}/10</span>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Score;