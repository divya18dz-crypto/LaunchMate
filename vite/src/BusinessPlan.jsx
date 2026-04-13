function BusinessPlan({ setActivePage, activeIdea }) {
  const plan = activeIdea?.analysis?.businessPlan || {};

  return (
    <div className="text-white p-2">

      

      {/* 🔥 TITLE */}
      <h1 className="text-2xl font-bold text-purple-300 mb-6">
        Business Plan 📄
      </h1>

      {/* 💎 MAIN CARD */}
      <div className="space-y-6">

        {/* PROBLEM */}
        <div className="p-5 rounded-xl 
        bg-purple-900/10 border border-purple-500/20 backdrop-blur-md">
          <h2 className="text-lg font-semibold text-purple-300 mb-2">
            🚨 Problem
          </h2>
          <p className="text-gray-300 text-sm">
            {plan.problem || "Submit an idea to see the generated problem analysis."}
          </p>
        </div>

        {/* SOLUTION */}
        <div className="p-5 rounded-xl 
        bg-purple-900/10 border border-purple-500/20 backdrop-blur-md">
          <h2 className="text-lg font-semibold text-purple-300 mb-2">
            💡 Solution
          </h2>
          <p className="text-gray-300 text-sm">
            {plan.solution || "Submit an idea to see the optimal solution."}
          </p>
        </div>

        {/* TARGET MARKET */}
        <div className="p-5 rounded-xl 
        bg-purple-900/10 border border-purple-500/20 backdrop-blur-md">
          <h2 className="text-lg font-semibold text-purple-300 mb-2">
            🎯 Target Market
          </h2>
          <p className="text-gray-300 text-sm">
            {plan.targetMarket || "Submit an idea to discover your target market."}
          </p>
        </div>

        {/* BUSINESS MODEL */}
        <div className="p-5 rounded-xl 
        bg-purple-900/10 border border-purple-500/20 backdrop-blur-md">
          <h2 className="text-lg font-semibold text-purple-300 mb-2">
            💰 Business Model
          </h2>
          <p className="text-gray-300 text-sm">
            {plan.businessModel || "Submit an idea to generate a highly scalable business model."}
          </p>
        </div>

        {/* UNIQUE VALUE */}
        <div className="p-5 rounded-xl 
        bg-purple-900/10 border border-purple-500/20 backdrop-blur-md">
          <h2 className="text-lg font-semibold text-purple-300 mb-2">
            ✨ Unique Value Proposition
          </h2>
          <p className="text-gray-300 text-sm">
            {plan.uniqueValue || "Submit an idea to uncover your unique value proposition."}
          </p>
        </div>

      </div>

    </div>
  );
}

export default BusinessPlan;