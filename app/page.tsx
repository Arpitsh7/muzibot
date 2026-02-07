"use client"

import Link from "next/link";
import { useSession, signOut } from "./api/lib/auth-client";
import { useRouter } from "next/navigation";
import Join from "./join/page"
export default function Home() {
  const router = useRouter();
  const session = useSession();

  const handleLaunch = () => {
    router.push("/join")
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] relative overflow-hidden">
      {/* Gradient Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 20% 30%, rgba(56, 189, 248, 0.4) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 70%, rgba(139, 92, 246, 0.3) 0%, transparent 70%),
            radial-gradient(ellipse at 60% 20%, rgba(236, 72, 153, 0.25) 0%, transparent 50%),
            radial-gradient(ellipse at 40% 80%, rgba(34, 197, 94, 0.2) 0%, transparent 65%)
          `,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">

        {/* Hero Section */}
        <div className="max-w-3xl space-y-6">

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-purple-400 to-pink-400">
              Your Playlist,
            </span>
            <br />
            <span className="text-white">
              Everyone's Vibe
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base md:text-lg text-gray-300 max-w-xl mx-auto leading-relaxed">
            Create shared music queues where everyone can add their favorite songs.
            Vote, collaborate, and let the best tracks rise to the top.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-10">

            {/* Launch Button */}
            <button
              onClick={handleLaunch}
              disabled={session.isPending}
              className="group relative px-6 py-3 bg-gradient-to-r from-sky-500 via-purple-500 to-pink-500 text-white text-base font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/50 disabled:opacity-50"
            >
              <span className="relative z-10">
                {session.isPending ? "Loading..." : "Launch App"}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-sky-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

              <button
                className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white text-base font-semibold rounded-lg border border-white/20 transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:border-white/40"
                onClick={() => handleLaunch()}
              >
                Join
              </button>
          </div>

          {/* Social Proof */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-gray-400 text-xs">
              Join thousands creating unforgettable music experiences
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );
}
