"use client"

export default function Dashboard(){
  return(
    <div className="min-h-screen w-full relative bg-black">
      {/* Emerald Depths Background with Top Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(16, 185, 129, 0.25), transparent 70%), #000000",
        }}
      />
 
      {/* Main Content Area */}
      <div className="relative ml-120 pt-4 z-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-neutral-200 via-emerald-600 to-cyan-500 bg-clip-text text-transparent">
          The Playlist
        </h1>
      </div>

      {/* Right sidebar */}
      <div className="fixed top-0 right-0 z-10 h-screen">
        <div className="h-full w-[355px] bg-white/5 backdrop-blur-2xl border-l border-white/10 relative shadow-2xl p-6">
          <div className="absolute -left-px inset-y-0 w-px h-full bg-gradient-to-b from-transparent via-emerald-400 to-transparent" />
          
          {/* Songs Heading */}
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Songs</h2>
          
          {/* Input Box */}
          <input 
            type="text"
            placeholder="Put your songs here"
            className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all"
          />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="fixed bottom-0 left-0 z-10 w-screen">
        <div className="h-[140px] w-[1180px] bg-white/5 backdrop-blur-2xl border-t border-white/10 relative shadow-2xl">
          <div className="absolute -top-px inset-x-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />
        </div>
      </div>
    </div>
  )
}