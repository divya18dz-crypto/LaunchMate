function Risk({ setActivePage, activeIdea }) {
  const risk = activeIdea?.analysis?.risk || {};

  return (
    <div className="text-white p-2">

      {/* 🔥 TITLE */}
      <h1 className="text-2xl font-bold text-purple-300 mb-6">
        Risk Detection ⚠️
      </h1>

      {/* 💎 MAIN CARD */}
      <div className="space-y-6">

        {/* TECHNICAL RISK */}
        <div className="p-5 rounded-xl 
        bg-purple-900/10 border border-purple-500/20 backdrop-blur-md">
          <h2 className="text-lg font-semibold text-purple-300 mb-2">
            ⚙️ Technical Risk
          </h2>
          <p className="text-gray-300 text-sm">
            {risk.technicalRisk || "Submit an idea to analyze technical hurdles."}
          </p>
        </div>

        {/* MARKET RISK */}
        <div className="p-5 rounded-xl 
        bg-purple-900/10 border border-purple-500/20 backdrop-blur-md">
          <h2 className="text-lg font-semibold text-purple-300 mb-2">
            📉 Market Risk
          </h2>
          <p className="text-gray-300 text-sm">
            {risk.marketRisk || "Submit an idea to evaluate market risks."}
          </p>
        </div>

        {/* FINANCIAL RISK */}
        <div className="p-5 rounded-xl 
        bg-purple-900/10 border border-purple-500/20 backdrop-blur-md">
          <h2 className="text-lg font-semibold text-purple-300 mb-2">
            💸 Financial Risk
          </h2>
          <p className="text-gray-300 text-sm">
            {risk.financialRisk || "Submit an idea to assess funding and burn rate risks."}
          </p>
        </div>

        {/* MITIGATION STRATEGY */}
        <div className="p-5 rounded-xl 
        bg-purple-900/10 border border-purple-500/20 backdrop-blur-md">
          <h2 className="text-lg font-semibold text-purple-300 mb-2">
            🛡️ Mitigation Strategy
          </h2>
          <p className="text-gray-300 text-sm">
            {risk.mitigationStrategy || "Submit an idea for risk mitigation steps."}
          </p>
        </div>

      </div>

    </div>
  );
}

export default Risk;
