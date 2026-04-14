import ParticlesBg from "./ParticlesBg";

function Home({ setPage }) {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-[#0d001a] via-black to-[#200040] relative overflow-hidden">

      {/* PARTICLES */}
      <ParticlesBg />

      {/* CONTENT WRAPPER */}
      <div className="relative z-10">

        {/* NAVBAR */}
        <header>
          <nav className="flex items-center justify-between p-6 lg:px-8">

            {/* LEFT - Logo */}
            <div className="flex lg:flex-1">
              <span
                className="text-white font-bold text-xl cursor-pointer"
                onClick={() => setPage("home")}
              >
                LaunchMate 🚀
              </span>
            </div>

            {/* CENTER - Menu */}
            <div className="hidden lg:flex items-center gap-10">
              <span 
                onClick={() => setPage("product")} 
                className="text-sm font-semibold text-white/90 cursor-pointer hover:text-purple-400 transition"
              >
                Product
              </span>
              <span 
                onClick={() => setPage("features")} 
                className="text-sm font-semibold text-white/90 cursor-pointer hover:text-purple-400 transition"
              >
                Features
              </span>
              <span
                onClick={() => setPage("learn")}
                className="text-sm font-semibold text-white cursor-pointer hover:text-purple-400"
              >
                About
              </span>
            </div>

            {/* RIGHT - Login */}
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <button
                onClick={() => setPage("login")}
                className="text-sm font-semibold text-white cursor-pointer hover:text-purple-400 transition"
              >
                Log in →
              </button>
            </div>

          </nav>
        </header>

        {/* HERO SECTION */}
        <div className="px-6 pt-5 lg:px-8">

          {/* Background Blur */}
          <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl">
            <div className="relative left-1/2 w-[36rem] -translate-x-1/2 rotate-30 bg-gradient-to-tr from-pink-500 to-purple-500 opacity-30"></div>
          </div>

          {/* Content */}
          <div className="mx-auto max-w-2xl py-32 text-center">

            <h1 className="text-5xl font-bold text-white sm:text-7xl">
              Build Your Startup Smarter 🚀
            </h1>

            <p className="mt-6 text-lg text-gray-400">
              LaunchMate helps founders validate ideas, generate business plans,
              and grow their startups with confidence.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex items-center justify-center gap-x-6">

              <button
                onClick={() => setPage("login")}
                className="px-6 py-2.5 rounded-md text-sm font-semibold text-purple-400  
                bg-purple-500/10 backdrop-blur-md 
                border border-purple-400/20 
                shadow-md 
                hover:bg-purple-500/20 
                hover:shadow-[0_0_25px_rgba(128,0,255,0.4)] 
                hover:scale-105 
                transition duration-300"
              >
                Get Started
              </button>

              <span
                onClick={() => setPage("learn")}
                className="text-sm font-semibold text-white cursor-pointer hover:text-purple-400 transition"
              >
                Learn more →
              </span>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Home;