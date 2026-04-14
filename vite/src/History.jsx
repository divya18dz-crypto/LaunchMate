import { useState, useEffect } from "react";

function History({ setPage, setActiveIdea, showToast }) {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/ideas/history`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("launchmate_token")}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setIdeas(data);
      } else {
        setError(data.error || "Failed to load history.");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectIdea = (idea) => {
    setActiveIdea(idea);
    setPage("dashboard");
  };

  const handleDeleteIdea = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this idea?")) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/ideas/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("launchmate_token")}`
        }
      });
      if (response.ok) {
        setIdeas(ideas.filter(idea => idea._id !== id));
        showToast("Idea deleted successfully", "success");
      } else {
        showToast("Failed to delete idea.", "error");
      }
    } catch (err) {
      showToast("Error deleting idea.", "error");
    }
  };

  return (
    <div className="min-h-screen text-white p-6 relative z-0">
      
      
      <div className="dashboard-bg-container">
        <div className="dashboard-bg-noise"></div>
        <div className="dashboard-bg-grid"></div>
        <div className="dashboard-bg-orb orb-1"></div>
        <div className="dashboard-bg-orb orb-4"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-purple-300">Your Idea History 📜</h1>
            <p className="text-gray-400 mt-2">Revisit and manage your past startup analyses.</p>
          </div>
          <button 
            onClick={() => setPage("dashboard")}
            className="px-5 py-2 rounded-lg border border-purple-500/30 text-purple-300 hover:bg-purple-500/20 transition"
          >
            ← Back to Dashboard
          </button>
        </div>

        {error && (
          <div className="p-4 mb-6 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-center">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : ideas.length === 0 ? (
          <div className="text-center py-20 glass-card rounded-2xl">
            <p className="text-gray-400 text-lg">No ideas found yet. Go analyze your first startup idea! 🚀</p>
            <button 
                onClick={() => setPage("input")}
                className="mt-6 px-6 py-2.5 bg-purple-600 hover:bg-purple-700 rounded-lg font-bold transition"
            >
                Analyze New Idea
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {ideas.map((idea) => (
              <div 
                key={idea._id}
                onClick={() => handleSelectIdea(idea)}
                className="group cursor-pointer p-6 rounded-2xl glass-card flex justify-between items-center hover:-translate-y-1 transition duration-300"
              >
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition">{idea.name}</h3>
                  <p className="text-sm text-gray-400 mt-1 italic line-clamp-1">"{idea.summary}"</p>
                  <p className="text-[10px] text-gray-500 mt-2">Analyzed on {new Date(idea.createdAt).toLocaleDateString()}</p>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right mr-4 hidden sm:block">
                    <span className="text-xs text-gray-400 block mb-1">Score</span>
                    <span className="text-lg font-bold text-emerald-400">{idea.analysis?.score?.total || 0}/100</span>
                  </div>
                  <button 
                    onClick={(e) => handleDeleteIdea(e, idea._id)}
                    className="p-2.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
                    title="Delete Idea"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default History;
