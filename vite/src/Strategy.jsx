function Strategy({ setActivePage, activeIdea }) {
  const strategy = activeIdea?.analysis?.strategy || {};
  return (
    <div className="text-white p-2">

      

      {/* 🔥 TITLE */}
      <h1 className="text-2xl font-bold text-purple-300 mb-6">
        Startup Strategy 🧠
      </h1>

      {/* 💎 MAIN CONTENT - VERTICAL TIMELINE */}
      <div className="relative ml-4 pl-8 border-l border-purple-500/30 space-y-12 pb-8">
        
        {/* PHASE 1: IMMEDIATE */}
        <div className="relative group">
          <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-purple-600 border-4 border-black shadow-[0_0_10px_rgba(168,85,247,0.8)] group-hover:scale-125 transition-transform"></div>
          <div className="p-5 rounded-xl bg-purple-900/10 border border-purple-500/20 backdrop-blur-md hover:border-purple-500/40 transition duration-300">
            <h2 className="text-lg font-semibold text-purple-300 mb-2 flex items-center gap-2">
              🚀 Phase 1: Execution
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
              {strategy.immediateNextSteps || "Submit an idea to see exactly what you should do tomorrow."}
            </p>
          </div>
        </div>

        {/* PHASE 2: LONG TERM */}
        <div className="relative group">
          <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-blue-500 border-4 border-black shadow-[0_0_10px_rgba(59,130,246,0.8)] group-hover:scale-125 transition-transform"></div>
          <div className="p-5 rounded-xl bg-blue-900/10 border border-blue-500/20 backdrop-blur-md hover:border-blue-500/40 transition duration-300">
            <h2 className="text-lg font-semibold text-blue-300 mb-2 flex items-center gap-2">
              📈 Phase 2: Growth & Scale
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
              {strategy.longTermVision || "Submit an idea to envision where you could be in 3 years."}
            </p>
          </div>
        </div>

        {/* PHASE 3: RISK MANAGEMENT */}
        <div className="relative group">
          <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-red-500 border-4 border-black shadow-[0_0_10px_rgba(239,68,68,0.8)] group-hover:scale-125 transition-transform"></div>
          <div className="p-5 rounded-xl bg-red-900/10 border border-red-500/20 backdrop-blur-md hover:border-red-500/40 transition duration-300">
            <h2 className="text-lg font-semibold text-red-300 mb-2 flex items-center gap-2">
              ⚠️ Phase 3: Risk Mitigation
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
              {strategy.risks || "Submit an idea to outline potential risks and challenges."}
            </p>
          </div>
        </div>

        {/* FINAL RECOMMENDATION */}
        <div className="relative group">
          <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-emerald-500 border-4 border-black shadow-[0_0_10px_rgba(16,185,129,0.8)] group-hover:scale-125 transition-transform"></div>
          <div className="p-5 rounded-xl bg-gradient-to-br from-emerald-900/20 via-black/40 to-emerald-900/20 border border-emerald-500/40 backdrop-blur-md transform hover:-translate-y-1 transition duration-300">
            <h2 className="text-lg font-semibold text-emerald-300 mb-2 flex items-center gap-2">
              💡 Winning Play
            </h2>
            <p className="text-gray-200 text-sm font-medium italic">
              {strategy.recommendation || "Submit an idea to get a final strategic recommendation."}
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Strategy;