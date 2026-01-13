import { ExternalLink } from "lucide-react"

const EXAMPLES = [
  {
    title: "Rubik Portfolio",
    desc: "Interactive cube with a smooth, scroll-driven narrative layout.",
    href: "/examples/rubik",
    tag: "Portfolio",
  },
]

export default function Examples() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* background grid */}
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.12]" />

      {/* soft top glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[40vh] bg-[radial-gradient(ellipse_at_top,rgba(96,165,250,0.15),transparent_60%)]" />

      <div className="relative max-w-6xl mx-auto px-6 py-20">
        {/* header */}
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <div className="text-xs tracking-[0.25em] uppercase text-blue-300/80">
              Examples
            </div>

            <h1 className="mt-4 text-5xl md:text-6xl font-extrabold leading-tight bg-gradient-to-br from-white via-blue-100 to-purple-300 bg-clip-text text-transparent">
              Explore what SceneForge can build
            </h1>

            <p className="mt-5 text-lg text-slate-400 max-w-2xl">
              Real, production-ready scenes exported as clean React Three Fiber JSX.
            </p>
          </div>

          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-slate-700/70 bg-slate-900/40 hover:bg-slate-900/60 transition-colors"
          >
            Back to Home
          </a>
        </div>

        {/* cards */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {EXAMPLES.map((ex) => (
            <button
              key={ex.href}
              onClick={() =>
                window.open(ex.href, "_blank", "noopener,noreferrer")
              }
              className="
                group relative text-left rounded-[2rem] p-8
                border border-slate-700/50
                bg-gradient-to-br from-slate-900/70 via-slate-800/30 to-slate-900/70
                backdrop-blur-xl
                transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]
                hover:-translate-y-1 hover:border-blue-500/60
              "
            >
              {/* hover glow */}
              <div className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition duration-500 bg-[radial-gradient(ellipse_at_top_left,rgba(96,165,250,0.18),transparent_60%)]" />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-blue-500/10 border border-blue-400/20 text-blue-300">
                    {ex.tag}
                  </span>

                  <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-blue-300 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-white group-hover:text-blue-200 transition-colors">
                  {ex.title}
                </h3>

                <p className="mt-3 text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                  {ex.desc}
                </p>

                <div className="mt-8 flex items-center justify-between text-sm text-slate-400">
                  <span className="group-hover:text-slate-300 transition-colors">
                    Open example
                  </span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
