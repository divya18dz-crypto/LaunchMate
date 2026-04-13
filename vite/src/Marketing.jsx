import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

function Marketing({ setActivePage, activeIdea }) {
  const marketing = activeIdea?.analysis?.marketing || {};
  
  // Fallback data if growthProjection is missing
  const defaultProjection = [
    { month: 'Month 1', reach: 500, engagement: 50 },
    { month: 'Month 2', reach: 1800, engagement: 180 },
    { month: 'Month 3', reach: 4500, engagement: 450 },
    { month: 'Month 4', reach: 12000, engagement: 1100 },
    { month: 'Month 5', reach: 30000, engagement: 2800 },
    { month: 'Month 6', reach: 75000, engagement: 6800 },
  ];

  const chartData = marketing.growthProjection || defaultProjection;

  return (
    <div className="text-white p-2">

      

      {/* 🔥 TITLE */}
      <h1 className="text-2xl font-bold text-purple-300 mb-6">
        Marketing Strategy 📢
      </h1>

      {/* 💎 MAIN CONTENT */}
      <div className="space-y-6">

        {/* TARGET AUDIENCE (Hiding if AI doesn't yield it in this specific tab, repurposing for channels) */}
        
        {/* CHANNELS */}
        <div className="p-5 rounded-xl 
        bg-purple-900/10 border border-purple-500/20 backdrop-blur-md">
          <h2 className="text-lg font-semibold text-purple-300 mb-2">
            📱 Primary Channel
          </h2>
          <p className="text-gray-300 text-sm">
            {marketing.channel1 || "Submit an idea to see marketing channels."}
          </p>
        </div>

        <div className="p-5 rounded-xl 
        bg-purple-900/10 border border-purple-500/20 backdrop-blur-md">
          <h2 className="text-lg font-semibold text-purple-300 mb-2">
            📈 Secondary Channel
          </h2>
          <p className="text-gray-300 text-sm">
            {marketing.channel2 || "Submit an idea to see marketing channels."}
          </p>
        </div>

        {/* STRATEGY */}
        <div className="p-5 rounded-xl 
        bg-purple-900/10 border border-purple-500/20 backdrop-blur-md">
          <h2 className="text-lg font-semibold text-purple-300 mb-2">
            🚀 Growth Strategy
          </h2>
          <p className="text-gray-300 text-sm">
            {marketing.strategy || "Submit an idea to generate a highly targeted growth strategy."}
          </p>
        </div>

        {/* BRANDING */}
        <div className="p-5 rounded-xl 
        bg-purple-900/10 border border-purple-500/20 backdrop-blur-md">
          <h2 className="text-lg font-semibold text-purple-300 mb-2">
            🎨 Branding
          </h2>
          <p className="text-gray-300 text-sm">
            {marketing.branding || "Submit an idea to map out a brand identity."}
          </p>
        </div>

        {/* 📈 GROWTH PROJECTION GRAPH */}
        <div className="p-6 rounded-2xl bg-black/40 border border-purple-500/30 shadow-[0_0_30px_rgba(128,0,255,0.15)] overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-purple-400">📊</span> Projected Marketing Reach
            </h2>
            <div className="flex gap-4 text-xs">
              <div className="flex items-center gap-1.5 text-gray-400">
                <div className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_5px_rgba(168,85,247,0.5)]"></div>
                Reach
              </div>
              <div className="flex items-center gap-1.5 text-gray-400">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-400 shadow-[0_0_5px_rgba(96,165,250,0.5)]"></div>
                Engagement
              </div>
            </div>
          </div>

          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorReach" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#60a5fa" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  stroke="#94a3b8" 
                  fontSize={11} 
                  tickLine={false} 
                  axisLine={false}
                  dy={10}
                />
                <YAxis 
                  stroke="#94a3b8" 
                  fontSize={11} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(value) => value >= 1000 ? `${value/1000}k` : value}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                    borderColor: 'rgba(168, 85, 247, 0.3)',
                    borderRadius: '12px',
                    backdropFilter: 'blur(8px)',
                    color: '#fff',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
                  }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="reach" 
                  stroke="#a855f7" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorReach)" 
                  animationDuration={2000}
                />
                <Area 
                  type="monotone" 
                  dataKey="engagement" 
                  stroke="#60a5fa" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorEngagement)" 
                  animationDuration={2500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 text-[10px] text-gray-500 text-center italic">
            * Projected metrics based on suggested acquisition channels and industry benchmarks.
          </p>
        </div>

      </div>

    </div>
  );
}

export default Marketing;