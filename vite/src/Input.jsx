import { useState } from "react";

function Input({ setPage, setActiveIdea }) {
  const [idea, setIdea] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!idea || !summary) {
      showToast("Please fill all fields before analyzing!", "error");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/ideas/analyze`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("launchmate_token")}`
        },
        body: JSON.stringify({ name: idea, summary }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to analyze idea.");
        setLoading(false);
        return;
      }

      // Pass the returned structure to App.jsx global state
      if (setActiveIdea) {
        setActiveIdea(data.idea);
      }
      
      setPage("dashboard");
    } catch (err) {
      setError("Failed to reach server. Is it running?");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent">

      {/* Glass Card */}
      <div className="backdrop-blur-md bg-purple-900/10 
      border border-purple-500/20 
      p-8 rounded-xl shadow-lg w-[90%] max-w-lg">

        {/* Title */}
        <h2 className="text-2xl font-bold text-purple-300 text-center mb-6">
          Tell us about your idea 🚀
        </h2>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 text-sm p-3 rounded-md mb-4 text-center">
            {error}
          </div>
        )}

        {/* Idea Name */}
        <input
          type="text"
          placeholder="Startup Idea Name"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          className="w-full p-3 mb-4 rounded-md 
          bg-black/40 text-white 
          border border-purple-500/20 
          focus:outline-none focus:ring-2 focus:ring-purple-600"
        />

        {/* Idea Summary */}
        <textarea
          placeholder="Brief summary of your idea..."
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="w-full p-3 mb-6 rounded-md 
          bg-black/40 text-white 
          border border-purple-500/20 
          focus:outline-none focus:ring-2 focus:ring-purple-600"
          rows="4"
        />

        {/* Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-2.5 rounded-md font-semibold text-purple-300 bg-purple-500/10 backdrop-blur-md border border-purple-400/20 transition duration-300
          ${loading 
            ? 'opacity-50 cursor-wait' 
            : 'hover:bg-purple-500/20 hover:shadow-[0_0_25px_rgba(128,0,255,0.4)] hover:scale-105'
          }`}
        >
          {loading ? "AI is Analyzing... (Takes ~5 sec) 🤖" : "Analyze Idea 🚀"}
        </button>

      </div>
    </div>
  );
}

export default Input;