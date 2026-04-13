function Pitch({ setActivePage, activeIdea }) {
  const pitch = activeIdea?.analysis?.pitch || {};
  const plan = activeIdea?.analysis?.businessPlan || {};
  return (
    <div className="text-white p-2">

      

      {/* 🔥 TITLE */}
      <h1 className="text-2xl font-bold text-purple-300 mb-6">
        Startup Pitch 🚀
      </h1>

      {/* 💎 MAIN CARD */}
      <div className="p-6 rounded-2xl 
      bg-gradient-to-br from-purple-900/20 via-black/40 to-purple-900/20
      border border-purple-500/20 backdrop-blur-md shadow-lg space-y-6">

        {/* ONE LINER */}
        <div>
          <h2 className="text-lg font-semibold text-purple-300 mb-2">
            💡 One-Line Elevator Pitch
          </h2>
          <p className="text-gray-300 text-sm text-xl italic text-purple-100 bg-black/20 p-4 border border-white/5 rounded-xl">
            "{pitch.elevator || "Submit an idea to forge a 1-sentence elevator pitch."}"
          </p>
        </div>

        {/* PROBLEM */}
        <div>
          <h2 className="text-lg font-semibold text-purple-300 mb-2">
            🚨 Problem
          </h2>
          <p className="text-gray-300 text-sm">
            {plan.problem || "Submit an idea to identify the core problem."}
          </p>
        </div>

        {/* TAGLINE */}
        <div>
          <h2 className="text-lg font-semibold text-purple-300 mb-2">
            📢 Catchy Tagline
          </h2>
          <p className="text-gray-300 text-xl font-bold uppercase tracking-wider text-purple-400">
            {pitch.tagline || ""}
          </p>
        </div>

        {/* SOLUTION */}
        <div>
          <h2 className="text-lg font-semibold text-purple-300 mb-2">
            💡 Core Solution
          </h2>
          <p className="text-gray-300 text-sm">
            {plan.solution || "Solution details..."}
          </p>
        </div>

        {/* MARKET */}
        <div>
          <h2 className="text-lg font-semibold text-purple-300 mb-2">
            🌍 Market Opportunity
          </h2>
          <p className="text-gray-300 text-sm">
            {pitch.marketOpportunity || "Submit an idea to discover the market opportunity."}
          </p>
        </div>

        {/* REVENUE */}
        <div>
          <h2 className="text-lg font-semibold text-purple-300 mb-2">
            💰 Revenue Model
          </h2>
          <p className="text-gray-300 text-sm">
            {pitch.revenueModel || "Submit an idea to define the revenue model."}
          </p>
        </div>

      </div>

      {/* 🔥 CTA */}
      <div className="mt-8 text-center">
        <p className="text-purple-300 text-lg font-semibold">
          🚀 Ready to launch your startup with confidence?
        </p>
      </div>

    </div>
  );
}

export default Pitch;