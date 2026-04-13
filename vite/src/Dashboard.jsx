import { useState, useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import BusinessPlan from "./BusinessPlan";
import Score from "./Score";
import Budget from "./Budget";
import Marketing from "./Marketing";
import Analytics from "./Analytics";
import Pitch from "./Pitch";
import Strategy from "./Strategy";
import Risk from "./Risk";
import IdeaChatbot from "./IdeaChatbot";
import businessImg from "./assets/buisness.jpeg";
import scoreImg from "./assets/score.jpeg";
import budgetImg from "./assets/budget.jpeg";
import marketingImg from "./assets/marketing.jpeg";
import analyticsImg from "./assets/analytics.jpeg";
import pitchImg from "./assets/pitch.jpeg";
import strategyImg from "./assets/stratergy.jpeg";
import riskImg from "./assets/risk.jpeg";

function Dashboard({ activeIdea, setPage }) {
  const [activePage, setActivePage] = useState("main");
  const reportRef = useRef(null);

  const exportToPDF = async () => {
    try {
      const ai = activeIdea?.analysis;
      if (!ai) {
        showToast("No analysis available to export.", "error");
        return;
      }

      const doc = new jsPDF("p", "mm", "a4");
      let y = 20;

      // Ensure we don't write off the page
      const checkY = (spaceNeeded = 10) => {
        if (y + spaceNeeded > 280) {
          doc.addPage();
          y = 20;
          return true;
        }
        return false;
      };

      // Header Gradient / Line
      doc.setDrawColor(128, 0, 255);
      doc.setLineWidth(0.5);
      doc.line(15, 22, 195, 22);

      // Title
      doc.setFontSize(24);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(40, 40, 40);
      doc.text(activeIdea?.name || "Startup Analysis", 15, y);
      y += 12;

      // Summary
      doc.setFontSize(11);
      doc.setFont("helvetica", "italic");
      doc.setTextColor(100, 100, 100);
      const summaryLines = doc.splitTextToSize(activeIdea?.summary || "", 180);
      doc.text(summaryLines, 15, y);
      y += (summaryLines.length * 6) + 12;

      // Section Helper
      const addSection = (title, contentObj) => {
        if (!contentObj) return;
        checkY(25);
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(128, 0, 255); // Purple header
        doc.text(title, 15, y);
        y += 8;

        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(60, 60, 60);

        if (typeof contentObj === "string") {
          const lines = doc.splitTextToSize(contentObj, 175);
          checkY(lines.length * 6);
          doc.text(lines, 18, y);
          y += (lines.length * 6) + 8;
        } else {
          Object.entries(contentObj).forEach(([key, val]) => {
            if (key === "growthProjection") return; // Skip raw data
            const label = key.replace(/([A-Z])/g, ' $1').toUpperCase();
            const text = `${label}: ${val}`;
            const lines = doc.splitTextToSize(text, 175);
            checkY(lines.length * 6);

            doc.setFont("helvetica", "bold");
            doc.text(`${label}:`, 18, y);

            doc.setFont("helvetica", "normal");
            const valLines = doc.splitTextToSize(` ${val}`, 175 - doc.getTextWidth(`${label}:`));
            doc.text(valLines, 18 + doc.getTextWidth(`${label}:`), y);

            y += (valLines.length * 6) + 3;
          });
          y += 5;
        }
      };

      addSection("Executive Summary", ai.generalAnalysis);
      addSection("Startup Score", {
        TotalScore: `${ai.score?.total || 0}/100`,
        Summary: ai.score?.summary,
        Innovation: `${ai.score?.innovation || 0}/10`,
        MarketDemand: `${ai.score?.marketDemand || 0}/10`,
        ProfitPotential: `${ai.score?.profitPotential || 0}/10`,
        Feasibility: `${ai.score?.feasibility || 0}/10`
      });

      // MARKETING GRAPH CAPTURE
      if (ai.marketing) {
        addSection("Marketing Strategy", ai.marketing);
        
        // We capture the graph from the hidden container or the modal if open
        const graphElement = document.getElementById("marketing-graph-capture");
        if (graphElement) {
          try {
            const canvas = await html2canvas(graphElement, {
              backgroundColor: "#0d001a",
              scale: 2,
              logging: false
            });
            const imgData = canvas.toDataURL("image/png");
            checkY(90);
            doc.addImage(imgData, "PNG", 20, y, 170, 80);
            y += 90;
          } catch (e) {
            console.error("Graph Capture Error:", e);
          }
        }
      }

      addSection("Business Plan", ai.businessPlan);
      addSection("Budget Estimate", ai.budget);
      addSection("Strategic Roadmap", ai.strategy);
      addSection("Risk Detection", ai.risk);
      addSection("Analytics & KPIs", ai.analytics);

      doc.save(`${activeIdea?.name || "Startup"}_Investor_Report.pdf`);
    } catch (error) {
      console.error("PDF Export Error:", error);
      showToast("Failed to export PDF! " + (error.message || ""), "error");
    }
  };

  return (
    <div className="min-h-screen text-white p-6 relative z-0">
      
      {/* 🌌 DYNAMIC CSS BACKGROUND (Only for Dashboard) */}
      <div className="dashboard-bg-container">
        <div className="dashboard-bg-noise"></div>
        <div className="dashboard-bg-grid"></div>
        <div className="dashboard-bg-orb orb-1"></div>
        <div className="dashboard-bg-orb orb-2"></div>
        <div className="dashboard-bg-orb orb-3"></div>
        <div className="dashboard-bg-orb orb-4"></div>
        <div className="dashboard-bg-orb orb-5"></div>
      </div>



      {/* ALL MODALS (using Tailwind !important modifiers to strip child background/min-h/buttons) */}
      {activePage !== "main" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
          
          <div className="relative w-full max-w-4xl max-h-[85vh] flex flex-col bg-[#0d001a] rounded-2xl shadow-[0_0_50px_rgba(128,0,255,0.3)] border border-purple-500/30 overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b border-purple-500/20 bg-black/40">
              <h2 className="text-xl font-bold text-white capitalize">{activePage} Detail</h2>
              <button 
                onClick={() => setActivePage("main")}
                className="text-gray-400 hover:text-white text-3xl font-light leading-none"
              >
                &times;
              </button>
            </div>

            {/* Modal Body - Forcing child layouts to fit the modal */}
            <div className="overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-purple-900 scrollbar-track-transparent 
            [&>div]:min-h-0 [&>div]:!bg-transparent [&>div]:!bg-none [&>div]:!p-6 [&>div>button]:hidden [&>div>h1]:hidden">
              {activePage === "business" && <BusinessPlan setActivePage={setActivePage} activeIdea={activeIdea} />}
              {activePage === "score" && <Score setActivePage={setActivePage} activeIdea={activeIdea} />}
              {activePage === "budget" && <Budget setActivePage={setActivePage} activeIdea={activeIdea} />}
              {activePage === "marketing" && <Marketing setActivePage={setActivePage} activeIdea={activeIdea} />}
              {activePage === "analytics" && <Analytics setActivePage={setActivePage} activeIdea={activeIdea} />}
              {activePage === "pitch" && <Pitch setActivePage={setActivePage} activeIdea={activeIdea} />}
              {activePage === "strategy" && <Strategy setActivePage={setActivePage} activeIdea={activeIdea} />}
              {activePage === "risk" && <Risk setActivePage={setActivePage} activeIdea={activeIdea} />}
            </div>

          </div>
        </div>
      )}

      {/* HEADER SECTION WITH LOGOUT & EXPORT */}
      <div className={`flex justify-end gap-3 mb-4 ${activePage !== "main" ? "blur-sm transition duration-300" : "transition duration-300"}`}>
        <button 
          onClick={() => setPage("history")} 
          className="text-sm flex items-center gap-2 px-4 py-2 border border-purple-500/30 text-purple-300 hover:bg-purple-500/20 hover:text-white rounded-lg transition duration-300 shadow-[0_0_10px_rgba(128,0,255,0.1)]"
        >
          📜 View History
        </button>

        <button 
          onClick={exportToPDF} 
          className="text-sm flex items-center gap-2 px-4 py-2 border border-purple-500/30 text-purple-300 hover:bg-purple-500/20 hover:text-white rounded-lg transition duration-300 shadow-[0_0_10px_rgba(128,0,255,0.1)]"
        >
          📄 Export PDF
        </button>

        <button 
          onClick={() => {
            localStorage.removeItem("launchmate_token");
            setPage("home");
          }} 
          className="text-sm px-4 py-2 border border-red-500/30 text-red-400 hover:bg-red-500/20 hover:text-white rounded-lg transition duration-300 shadow-[0_0_10px_rgba(239,68,68,0.1)]"
        >
          Log Out
        </button>
      </div>

      {/* MAIN AI RESULT SECTION */}
      <div ref={reportRef} className={`mb-10 p-6 rounded-2xl glass-card relative z-10 ${activePage !== "main" ? "blur-sm transition duration-300" : "transition duration-300"}`}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-purple-300 mb-4">
              Your Startup Analysis 🚀
            </h1>

            <h2 className="text-xl font-semibold text-white mb-2">
              {activeIdea ? activeIdea.name : "Idea Name"}
            </h2>

            <p className="text-gray-400 mb-4 italic">
              "{activeIdea ? activeIdea.summary : "Your idea summary..."}"
            </p>

            <div className="text-gray-300 text-sm">
              <span className="font-bold text-purple-300">💡 AI Executive Summary:</span>
              <p className="mt-2 text-base">
                {activeIdea && activeIdea.analysis
                  ? activeIdea.analysis.generalAnalysis
                  : "No analysis available. Please submit an idea first!"}
              </p>
            </div>
          </div>

          {/* Execution Tracking Circular Progress Bar */}
          {activeIdea && activeIdea.analysis && (
            <div className="flex flex-col items-center justify-center p-4 bg-black/40 rounded-xl border border-purple-500/30 shadow-[0_0_15px_rgba(128,0,255,0.2)]">
              <h3 className="text-sm font-semibold text-purple-300 mb-3">Execution Tracking</h3>
              <div className="relative w-24 h-24">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    className="text-purple-900/30 stroke-current"
                    strokeWidth="8"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                  ></circle>
                  <circle
                    className="text-purple-400 stroke-current flex"
                    strokeWidth="8"
                    strokeLinecap="round"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 - (251.2 * (activeIdea.analysis.score?.feasibility ? activeIdea.analysis.score.feasibility * 10 : 0)) / 100}
                    style={{ transition: "stroke-dashoffset 1s ease-in-out" }}
                  ></circle>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-white">
                    {activeIdea.analysis.score?.feasibility ? activeIdea.analysis.score.feasibility * 10 : 0}%
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FEATURE CARDS */}
      <h2 className="text-xl font-semibold text-purple-300 mb-4">
        Explore Features
      </h2>

      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${activePage !== "main" ? "blur-sm transition duration-300" : "transition duration-300"}`}>
        {[
          { title: "Business Plan", page: "business", img: businessImg },
          { title: "Startup Score", page: "score", img: scoreImg },
          { title: "Budget", page: "budget", img: budgetImg },
          { title: "Marketing", page: "marketing", img: marketingImg },
          { title: "Analytics", page: "analytics", img: analyticsImg },
          { title: "Pitch", page: "pitch", img: pitchImg },
          { title: "Strategy", page: "strategy", img: strategyImg },
          { title: "Risk Detection", page: "risk", img: riskImg }
        ].map((card, index) => (
          <div 
            key={card.title}
            className="animate-fade-float"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div
              onClick={() => setActivePage(card.page)}
              className="group cursor-pointer p-5 rounded-xl glass-card hover:-translate-y-1 transition duration-300 h-full"
            >
              <img
                src={card.img}
                className="h-28 w-full object-cover rounded-lg mb-4 opacity-90 group-hover:opacity-100 transition duration-300"
              />
              <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition">
                {card.title}
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                Click to explore {card.title.toLowerCase()}
              </p>
            </div>
          </div>
        ))}
      </div>

      <IdeaChatbot activeIdea={activeIdea} />

      {/* 🔮 HIDDEN CONTAINER FOR PDF GRAPH CAPTURE */}
      <div className="fixed -left-[2000px] top-0 w-[800px]">
        <div id="marketing-graph-capture" className="p-8 bg-[#0d001a] rounded-2xl">
          <Marketing activeIdea={activeIdea} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;