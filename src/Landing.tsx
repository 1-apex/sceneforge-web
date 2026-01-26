import { useRef } from "react";
import { Code, Zap, Box, ArrowRight, Github } from "lucide-react";
import { SceneCanvas } from "./SceneCanvas";

export default function Landing() {
  const heroRef = useRef(null);

  // Smooth scroll to features
  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden selection:bg-blue-500/30 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">

      {/* Background Texture - deeply subtle noise */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      {/* Ambient Glows - Much more subtle and darker */}
      <div className="fixed top-[-20%] right-[-10%] w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[180px] pointer-events-none z-0 mix-blend-screen" />
      <div className="fixed bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[150px] pointer-events-none z-0 mix-blend-screen" />

      {/* Navigation */}
      <nav className="fixed top-6 left-0 right-0 z-50 px-6 lg:px-12 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
          {/* Logo */}
          <div className="inline-flex items-center gap-3 px-1 py-1 pr-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full hover:bg-white/10 transition-colors cursor-pointer group">
            <div className="w-8 h-8 rounded-full flex items-center justify-center">
              <img src="/sceneforge_logo.png" alt="SF" className="w-6 h-6" />
            </div>
            <span className="text-sm font-semibold tracking-wide text-zinc-100">
              SceneForge
            </span>
          </div>

          <a href="https://github.com/1-apex/sceneforge" target="_blank" rel="noopener noreferrer"
            className="hidden sm:flex group items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 rounded-full transition-all duration-300">
            <Github className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
            <span className="text-sm font-medium text-zinc-400 group-hover:text-white transition-colors">GitHub</span>
          </a>
        </div>
      </nav>

      <main className="relative z-10">

        {/* HERO SECTION */}
        <section ref={heroRef} className="relative min-h-screen flex items-center px-6 lg:px-12">
          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">

            {/* Left Content */}
            <div className="relative z-20 space-y-8 lg:pr-12 pt-20 lg:pt-0">

              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-950/30 border border-blue-800/30 rounded-full text-blue-300 text-xs font-medium tracking-wide">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                v1.0 Beta Live
              </div>

              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] text-white">
                Ship 3D
                <span className="block text-zinc-500 font-medium tracking-tighter mt-2">in minutes.</span>
              </h1>

              <p className="text-lg text-zinc-400 max-w-xl leading-relaxed">
                The visual editor for React Three Fiber. Generate production-ready components without touching a single vertex manually.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href="https://sceneforge-six.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-base hover:bg-zinc-200 transition-colors shadow-xl shadow-white/5 flex items-center gap-2"
                >
                  Start Building
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href="/examples"
                  className="px-8 py-4 text-white rounded-full font-medium text-base hover:bg-white/5 border border-white/5 hover:border-white/10 transition-all"
                >
                  View Examples
                </a>
              </div>
            </div>

            {/* Right 3D Visual - Bleeding into background */}
            <div className="absolute right-[-10%] top-[10%] lg:relative lg:right-auto lg:top-auto h-[70vh] w-[120%] lg:w-full lg:h-[800px] pointer-events-none lg:pointer-events-auto opacity-40 lg:opacity-100 scale-75 lg:scale-100 flex items-center justify-center">
              {/* 
                    We use a mask to fade the bottom of the canvas so it blends perfectly.
                    Also wrapping allows us to control the "floating" feel better.
                */}
              <div className="relative w-full h-full [mask-image:radial-gradient(circle_at_center,black_40%,transparent_70%)]">
                <SceneCanvas />
              </div>

              {/* Decorative circle behind */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/5 rounded-full z-[-1]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/[0.02] rounded-full z-[-1]" />
            </div>

          </div>

          {/* Scroll Hint */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-600 animate-pulse cursor-pointer" onClick={scrollToFeatures}>
            <span className="text-xs uppercase tracking-widest">Explore</span>
            <div className="w-px h-12 bg-gradient-to-b from-zinc-600 to-transparent" />
          </div>
        </section>

        {/* FEATURES GRID */}
        <section id="features" className="relative py-32 px-6 lg:px-12 bg-[#050505]">
          <div className="max-w-7xl mx-auto">

            <div className="mb-20">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Built for velocity.</h2>
              <p className="text-zinc-500 text-xl max-w-2xl">
                SceneForge abstracts the boilerplate so you can focus on the creative direction.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <FeatureCard
                icon={<Code className="w-6 h-6 text-blue-400" />}
                title="Clean Export"
                desc="Get readable, maintainable R3F JSX code. No spaghetti, no black boxes."
              />
              <FeatureCard
                icon={<Box className="w-6 h-6 text-purple-400" />}
                title="Asset Optimized"
                desc="Automatic GLTF compression and instance handling for 60fps performance."
              />
              <FeatureCard
                icon={<Zap className="w-6 h-6 text-yellow-400" />}
                title="Instant Prev"
                desc="Real-time lighting and material adjustments with immediate visual feedback."
              />
            </div>
          </div>
        </section>

        {/* FOOTER CTA */}
        {/* FOOTER CTA */}
        <section className="py-32 px-6 lg:px-12 border-t border-white/5 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
            <h3 className="text-5xl md:text-7xl font-black text-white tracking-tight">
              Ready to forge?
            </h3>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Join the beta and start building 3D experiences that feel magic.
            </p>
            <div className="pt-4 flex justify-center">
              <a
                href="https://sceneforge-six.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-base hover:bg-zinc-200 transition-colors shadow-xl shadow-white/5 flex items-center gap-2"
              >
                Start Building
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="group p-8 rounded-3xl bg-zinc-900/20 border border-white/5 hover:border-white/10 hover:bg-zinc-900/40 transition-all duration-500 cursor-default">
      <div className="mb-6 inline-flex p-3 rounded-2xl bg-white/5 group-hover:scale-110 transition-transform duration-500">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-zinc-100 mb-3 group-hover:text-white transition-colors">{title}</h3>
      <p className="text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors">
        {desc}
      </p>
    </div>
  )
}
