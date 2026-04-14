function Features({ setPage }) {
  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden">

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
            <span onClick={() => setPage("product")} className="text-sm font-semibold text-white cursor-pointer hover:text-purple-400">
              Product
            </span>
            <span onClick={() => setPage("features")} className="text-sm font-semibold text-purple-400 cursor-pointer">
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
        <div className="absolute inset-x-0 top-32 -z-10 transform-gpu overflow-hidden blur-3xl">
          <div className="relative left-1/4 w-[30rem] -translate-x-1/2 rotate-45 bg-gradient-to-tr from-pink-500 to-blue-500 opacity-20"></div>
        </div>

        <div className="mx-auto max-w-5xl">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-white sm:text-6xl mb-6">
                    Powerful Features. <br/> Zero Complexity.
                </h1>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                    We've packed LaunchMate with robust AI tools to cover every angle of your startup launch, consolidated into an incredibly aesthetic dashboard.
                </p>
            </div>

            <div className="space-y-6">
                
                {/* Feature 1 */}
                <div className="flex flex-col md:flex-row gap-8 items-center bg-[#0a0014]/60 p-8 rounded-3xl border border-purple-500/20 backdrop-blur-md shadow-xl group hover:border-purple-500/40 transition">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-4xl shadow-lg shrink-0 group-hover:scale-110 transition">
                        💬
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-2">Interactive AI Co-Founder</h2>
                        <p className="text-gray-400">Not sure about a specific marketing channel? Want to delve deeper into your budget breakdown? The always-on AI chat widget acts as your personal co-founder—ready to answer specific strategic questions about your startup idea instantly.</p>
                    </div>
                </div>

                {/* Feature 2 */}
                <div className="flex flex-col md:flex-row-reverse gap-8 items-center bg-[#0a0014]/60 p-8 rounded-3xl border border-purple-500/20 backdrop-blur-md shadow-xl group hover:border-purple-500/40 transition">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-pink-600 to-rose-600 flex items-center justify-center text-4xl shadow-lg shrink-0 group-hover:scale-110 transition">
                        📄
                    </div>
                    <div className="text-left md:text-right">
                        <h2 className="text-2xl font-bold text-white mb-2">Instant PDF Export</h2>
                        <p className="text-gray-400">Once your idea is analyzed, instantly export the entire comprehensive dashboard into a beautifully formatted, multi-page PDF document. Perfect for emailing to potential investors, co-founders, or saving for your records.</p>
                    </div>
                </div>

                {/* Feature 3 */}
                <div className="flex flex-col md:flex-row gap-8 items-center bg-[#0a0014]/60 p-8 rounded-3xl border border-purple-500/20 backdrop-blur-md shadow-xl group hover:border-purple-500/40 transition">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-4xl shadow-lg shrink-0 group-hover:scale-110 transition">
                        📊
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-2">7 Dedicated Intelligence Modules</h2>
                        <p className="text-gray-400">Dive into deeply specialized cards covering Business Plans, Marketing, SEO & Strategy, Execution Tracking, Elevator Pitches, Analytics, and Budget estimations. Your dashboard organizes everything categorically.</p>
                    </div>
                </div>

            </div>

            <div className="mt-16 text-center">
                <button
                onClick={() => setPage("login")}
                className="px-8 py-3 rounded-full border border-purple-500/50 text-purple-300 font-bold hover:bg-purple-500/20 hover:text-white transition duration-300 shadow-[0_0_15px_rgba(128,0,255,0.2)] hover:shadow-[0_0_25px_rgba(128,0,255,0.4)]"
                >
                Explore the Dashboard →
                </button>
            </div>

        </div>
      </div>
    </div>
  );
}

export default Features;
