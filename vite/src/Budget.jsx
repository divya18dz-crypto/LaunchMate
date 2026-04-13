function Budget({ setActivePage, activeIdea }) {
  const budget = activeIdea?.analysis?.budget || {};

  return (
    <div className="text-white p-2">

      

      {/* 🔥 TITLE */}
      <h1 className="text-2xl font-bold text-purple-300 mb-6">
        Budget Estimation 💰
      </h1>

      {/* 💎 MAIN CARD */}
      <div className="p-6 rounded-2xl 
      bg-gradient-to-br from-purple-900/20 via-black/40 to-purple-900/20
      border border-purple-500/20 backdrop-blur-md shadow-lg">

        {/* TOTAL */}
        <h2 className="text-3xl font-bold text-purple-300 mb-4">
          Estimated Budget: {budget.totalEstimate || "₹0"}
        </h2>

        {/* BREAKDOWN */}
        <div className="space-y-4 text-gray-300 text-sm bg-black/20 p-5 rounded-xl border border-white/5">
            <p className="text-base text-purple-200">
                {budget.breakdown || "Submit an idea to generate a specific budget breakdown."}
            </p>
        </div>

        {/* NOTE */}
        <p className="mt-6 text-xs text-gray-400 font-style-italic">
          *This is an estimated budget based on typical startup requirements. Actual costs may vary.
        </p>

      </div>

    </div>
  );
}

export default Budget;