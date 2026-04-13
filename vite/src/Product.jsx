import ParticlesBg from "./ParticlesBg";

function Product({ setPage }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d001a] via-black to-[#200040] relative overflow-hidden">
      
      {/* PARTICLES BACKGROUND */}
      <ParticlesBg />

      {/* NAVBAR */}
      <header className="relative z-10 border-b border-purple-500/20 bg-black/40 backdrop-blur-md">
        <nav className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <span
              className="text-white font-bold text-xl cursor-pointer"
              onClick={() => setPage("home")}
            >
              LaunchMate 🚀
            </span>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <span onClick={() => setPage("product")} className="text-sm font-semibold text-purple-400 cursor-pointer">
              Product
            </span>
            <span onClick={() => setPage("features")} className="text-sm font-semibold text-white cursor-pointer hover:text-purple-400">
              Features
            </span>
            <span onClick={() => setPage("learn")} className="text-sm font-semibold text-white cursor-pointer hover:text-purple-400">
              About
            </span>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <button
              onClick={() => setPage("home")}
              className="text-sm font-semibold text-white hover:text-purple-400 flex items-center gap-2 transition"
            >
              ← Back to Home
            </button>
          </div>
        </nav>
      </header>

      {/* HERO SECTION */}
      <div className="relative z-10 isolate px-6 pt-10 pb-24 lg:px-8">
        
        {/* Background Blur */}
        <div className="absolute inset-x-0 top-20 -z-10 transform-gpu overflow-hidden blur-3xl">
          <div className="relative left-1/4 w-[40rem] -translate-x-1/2 rotate-12 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-20"></div>
        </div>

        <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-md mb-8">
                <span className="flex h-2 w-2 rounded-full bg-purple-500 mr-2 animate-pulse"></span>
                <span className="text-sm font-medium text-purple-300">The Ultimate AI Product</span>
            </div>
            
            <h1 className="text-5xl font-bold text-white sm:text-7xl mb-8 leading-tight">
                Turn your brilliant ideas into <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">executable realities.</span>
            </h1>
            
            <p className="text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto mb-12">
                LaunchMate is a comprehensive startup co-pilot. We leverage advanced artificial intelligence to analyze, structure, and strategize your raw business concepts into professional, investor-ready roadmaps.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="p-6 rounded-2xl bg-[#0a0014]/60 backdrop-blur-lg border border-purple-500/20 shadow-xl hover:-translate-y-1 transition duration-300 group">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition">🧠</div>
                    <h3 className="text-xl font-bold text-white mb-2">Smart Analysis</h3>
                    <p className="text-gray-400 text-sm">Describe your idea, and our AI will break it down into feasibility scores, core problems, and targeted solutions.</p>
                </div>

                <div className="p-6 rounded-2xl bg-[#0a0014]/60 backdrop-blur-lg border border-purple-500/20 shadow-xl hover:-translate-y-1 transition duration-300 group">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition">📈</div>
                    <h3 className="text-xl font-bold text-white mb-2">Growth Strategy</h3>
                    <p className="text-gray-400 text-sm">Receive actionable, step-by-step immediate next steps and a long-term vision to guide your momentum.</p>
                </div>

                <div className="p-6 rounded-2xl bg-[#0a0014]/60 backdrop-blur-lg border border-purple-500/20 shadow-xl hover:-translate-y-1 transition duration-300 group">
                    <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition">🛡️</div>
                    <h3 className="text-xl font-bold text-white mb-2">Risk Detection</h3>
                    <p className="text-gray-400 text-sm">Pre-emptively identify technical, market, and financial risks before they derail your launch.</p>
                </div>
            </div>

            <div className="mt-16">
                <button
                onClick={() => setPage("login")}
                className="px-8 py-4 rounded-xl text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_30px_rgba(128,0,255,0.4)] hover:shadow-[0_0_50px_rgba(128,0,255,0.6)] hover:scale-105 transition-all duration-300"
                >
                Try the Product Now
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
