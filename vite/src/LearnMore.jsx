function LearnMore({ setPage }) {
  return (
    <div className="min-h-screen bg-transparent text-white px-6 py-10 relative overflow-hidden">

      {/* CONTENT WRAPPER */}
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl font-bold text-purple-400 mb-10 text-center">
          About LaunchMate 🚀
        </h1>

        {/* About Section */}
        <div className="max-w-3xl mx-auto mb-10">
          <h2 className="text-xl font-semibold text-purple-300 mb-3">
            What is LaunchMate?
          </h2>
          <p className="text-gray-300 leading-relaxed">
            LaunchMate is an AI-powered platform designed to help startups and aspiring 
            founders turn their ideas into reality. From validating business ideas to 
            generating structured plans, LaunchMate simplifies the entire startup journey.
          </p>
        </div>

        {/* Mission */}
        <div className="max-w-3xl mx-auto mb-10">
          <h2 className="text-xl font-semibold text-purple-300 mb-3">
            Our Mission 💡
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Our mission is to empower young entrepreneurs and developers by providing 
            smart tools that reduce uncertainty and guide them in building successful startups.
          </p>
        </div>

        {/* Features */}
        <div className="max-w-3xl mx-auto mb-10">
          <h2 className="text-xl font-semibold text-purple-300 mb-3">
            Key Features ⚡
          </h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>AI-based startup idea validation</li>
            <li>Automated business plan generation</li>
            <li>Smart suggestions for growth</li>
            <li>User-friendly and minimal interface</li>
          </ul>
        </div>

        {/* Founders */}
        <div className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-purple-300 mb-6 text-center">
            Meet the Founders 💜
          </h2>

          <div className="grid gap-6 sm:grid-cols-2">

            {/* You */}
            <div className="bg-[#0a0014]/60 backdrop-blur-md border border-purple-500/20 
            p-5 rounded-xl hover:shadow-[0_0_20px_rgba(128,0,255,0.3)] transition">
              <p className="text-purple-300 font-semibold text-lg">
                Divya K
              </p>
              <p className="text-gray-400 text-sm mt-2">
                A Passionate Developer about AI/ML and building 
                impactful tech solutions for startups.
              </p>
            </div>

            {/* Friend */}
            <div className="bg-[#0a0014]/60 backdrop-blur-md border border-purple-500/20 
            p-5 rounded-xl hover:shadow-[0_0_20px_rgba(128,0,255,0.3)] transition">
              <p className="text-purple-300 font-semibold text-lg">
                Charulatha M D
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Developer focused on creating scalable and user-friendly applications 
                with strong problem-solving skills.
              </p>
            </div>

          </div>
        </div>

        {/* Back Button */}
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => setPage("home")}
            className="w-full py-3 rounded-md font-bold 
            text-purple-300 
            bg-purple-500/10 backdrop-blur-md 
            border border-purple-400/20 
            hover:bg-purple-500/20 
            hover:shadow-[0_0_25px_rgba(128,0,255,0.4)] 
            hover:scale-[1.02] transition duration-300"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default LearnMore