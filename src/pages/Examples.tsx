import { ExternalLink } from "lucide-react";

const EXAMPLES = [
  {
    title: "Rubik Portfolio",
    desc: "Interactive cube + smooth scroll narrative UI.",
    href: "/examples/rubik",
    tag: "Portfolio",
  },
  // later you can add more cards here
];

export default function Examples() {
  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-15" />

      <div className="relative max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <div className="text-sm tracking-[0.2em] uppercase text-blue-300/80">
              Examples
            </div>
            <h1 className="mt-3 text-5xl md:text-6xl font-black bg-gradient-to-br from-white via-blue-100 to-purple-300 bg-clip-text text-transparent">
              Explore what SceneForge can build
            </h1>
            <p className="mt-4 text-slate-400 text-lg max-w-2xl">
              Click an example to open it in a new tab.
            </p>
          </div>

          <a
            href="/"
            className="px-6 py-3 rounded-2xl border border-slate-700/70 bg-slate-900/40 hover:bg-slate-900/60 transition"
          >
            Back to Home
          </a>
        </div>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {EXAMPLES.map((ex) => (
            <button
              key={ex.href}
              onClick={() => window.open(ex.href, "_blank", "noopener,noreferrer")}
              className="text-left group relative p-8 rounded-[2rem] border border-slate-700/60 bg-gradient-to-br from-slate-900/70 via-slate-800/30 to-slate-900/70 backdrop-blur-2xl hover:border-blue-500/60 transition-all duration-500 hover:scale-[1.02]"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wider bg-blue-500/10 border border-blue-400/20 text-blue-300">
                  {ex.tag}
                </div>
                <ExternalLink className="opacity-60 group-hover:opacity-100 transition" />
              </div>

              <h3 className="mt-6 text-2xl font-black group-hover:text-blue-200 transition">
                {ex.title}
              </h3>
              <p className="mt-3 text-slate-400 leading-relaxed group-hover:text-slate-300 transition">
                {ex.desc}
              </p>

              <div className="mt-8 h-px bg-white/10" />
              <div className="mt-4 text-sm text-slate-400 group-hover:text-slate-300 transition">
                Open example →
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
