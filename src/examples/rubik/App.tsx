import { useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Scene } from "./Scene";

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v));
}

function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const computeProgress = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (max <= 0) return 0;
      return clamp01(window.scrollY / max);
    };

    const onScroll = () => setScrollProgress(computeProgress());
    const onResize = () => setScrollProgress(computeProgress());

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return scrollProgress;
}

function useMouseNorm() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMouse({ x, y });
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return mouse;
}

export default function App() {
  const scrollProgress = useScrollProgress();
  const mouse = useMouseNorm();

  const progressLabel = useMemo(() => {
    if (scrollProgress < 0.34) return "INTRO";
    if (scrollProgress < 0.67) return "HISTORY";
    return "PATTERNS";
  }, [scrollProgress]);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-cyan-400 selection:text-black">
      {/* Fixed 3D background */}
      <div className="fixed inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 45 }}
          gl={{ antialias: true }}
          dpr={[1, 2]}
          onCreated={({ gl }) => {
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 1.05;
            gl.outputColorSpace = THREE.SRGBColorSpace;
          }}
        >
          <Scene scrollProgress={scrollProgress} mouse={mouse} />
        </Canvas>

        {/* Minimal overlays: vignette + grain + subtle grid */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),rgba(0,0,0,0.85)_60%,rgba(0,0,0,1)_100%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.055] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22120%22 height=%22120%22 filter=%22url(%23n)%22 opacity=%220.35%22/%3E%3C/svg%3E')]" />
      </div>

      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="h-2.5 w-2.5 rounded-full bg-cyan-400/90" />
                <div className="text-sm tracking-[0.22em] uppercase text-white/70">
                  Rubik Portfolio
                </div>
              </div>

              <div className="hidden md:flex items-center gap-4 text-xs tracking-[0.22em] uppercase text-white/45">
                <a href="#intro" className="hover:text-white/80 transition">
                  Intro
                </a>
                <a href="#history" className="hover:text-white/80 transition">
                  History
                </a>
                <a href="#patterns" className="hover:text-white/80 transition">
                  Patterns
                </a>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden sm:block text-xs text-white/45">
                  {progressLabel}
                </div>
                <ProgressPill value={scrollProgress} />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="relative z-10 pt-24">
        {/* INTRO */}
        <section id="intro" className="min-h-[92vh] flex items-center">
          <div className="mx-auto max-w-6xl px-6 py-20 w-full">
            <div className="grid lg:grid-cols-12 gap-10 items-end">
              <div className="lg:col-span-7">
                <div className="text-xs tracking-[0.28em] uppercase text-cyan-300/70">
                  Minimalist • Interactive • 3D
                </div>

                <h1 className="mt-5 text-6xl sm:text-7xl font-semibold leading-[0.98]">
                  A cube you can
                  <span className="block bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300">
                    feel.
                  </span>
                </h1>

                <p className="mt-6 max-w-xl text-lg text-white/70 leading-relaxed">
                  Scroll to guide the cube across the page. Let it breathe,
                  tilt, and transform—like an object on a designer’s desk.
                </p>

                <div className="mt-10 flex flex-wrap gap-3">
                  <a
                    href="#history"
                    className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 backdrop-blur-md transition"
                  >
                    Explore
                  </a>
                  <a
                    href="#patterns"
                    className="px-6 py-3 rounded-full bg-cyan-400 text-black font-semibold hover:brightness-110 transition"
                  >
                    Patterns
                  </a>
                </div>

                <div className="mt-10 text-sm text-white/45">
                  Tip: mouse tilt • scroll travel • smooth motion
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-7">
                  <div className="flex items-center justify-between">
                    <div className="text-sm tracking-[0.22em] uppercase text-white/60">
                      Quick facts
                    </div>
                    <div className="text-xs text-white/40">
                      Scroll: {(scrollProgress * 100).toFixed(0)}%
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-3 gap-4">
                    <Stat label="Faces" value="6" />
                    <Stat label="Stickers" value="54" />
                    <Stat label="States" value="43Q+" />
                  </div>

                  <div className="mt-6 text-sm text-white/60 leading-relaxed">
                    The Rubik’s Cube is a masterclass in constraints: simple
                    rules, endless variety. That’s why it’s perfect for a
                    minimalist interactive portfolio.
                  </div>
                </div>
              </div>
            </div>

            {/* minimal divider */}
            <div className="mt-16 h-px w-full bg-white/10" />
          </div>
        </section>

        {/* HISTORY */}
        <section id="history" className="min-h-screen flex items-center">
          <div className="mx-auto max-w-6xl px-6 py-24 w-full">
            <div className="grid md:grid-cols-12 gap-10 items-start">
              <div className="md:col-span-5">
                <h2 className="text-4xl font-semibold">History</h2>
                <p className="mt-5 text-white/70 leading-relaxed">
                  Designed in the 1970s by Ernő Rubik, the cube became a global
                  icon of logic and dexterity. It’s a puzzle that teaches you
                  how to *see* patterns, not just memorize steps.
                </p>

                <div className="mt-8 space-y-3 text-white/65">
                  <LineItem
                    title="Constraint-driven design"
                    desc="Few moving parts, huge possibility space."
                  />
                  <LineItem
                    title="Pattern recognition"
                    desc="Your eyes learn before your hands do."
                  />
                  <LineItem
                    title="Progress you can feel"
                    desc="Every solve is a measurable improvement."
                  />
                </div>
              </div>

              <div className="md:col-span-7">
                <div className="grid sm:grid-cols-2 gap-6">
                  <Card
                    title="Ernő Rubik"
                    desc="A design professor who built a puzzle to teach 3D movement."
                  />
                  <Card
                    title="Cultural icon"
                    desc="From classrooms to competitions—an object everyone recognizes."
                  />
                  <Card
                    title="Speedcubing"
                    desc="A community where algorithms become muscle memory."
                  />
                  <Card
                    title="Design lesson"
                    desc="Make constraints beautiful, then let motion do the talking."
                  />
                </div>
              </div>
            </div>

            <div className="mt-16 h-px w-full bg-white/10" />
          </div>
        </section>

        {/* PATTERNS */}
        <section id="patterns" className="min-h-screen flex items-center">
          <div className="mx-auto max-w-6xl px-6 py-24 w-full">
            <div className="max-w-3xl">
              <h2 className="text-4xl font-semibold">Patterns</h2>
              <p className="mt-5 text-white/70 leading-relaxed">
                Solving becomes a language: triggers, recognition, and flow. You
                start by thinking—then you start *seeing*.
              </p>
            </div>

            <div className="mt-10 grid md:grid-cols-3 gap-6">
              <Card
                title="Beginner Method"
                desc="Layer-by-layer: intuitive and friendly."
              />
              <Card title="CFOP" desc="Cross → F2L → OLL → PLL for speed." />
              <Card
                title="Roux"
                desc="Block-building + fewer turns, very elegant."
              />
            </div>

            <div className="mt-16 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <div className="text-sm tracking-[0.22em] uppercase text-white/55">
                    Interaction
                  </div>
                  <div className="mt-2 text-2xl font-semibold">
                    Scroll to guide it. Pause to watch it breathe.
                  </div>
                  <div className="mt-2 text-white/60">
                    Minimal UI, maximum feel.
                  </div>
                </div>
                <div className="flex gap-3">
                  <a
                    className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 transition"
                    href="#intro"
                  >
                    Back to intro
                  </a>
                </div>
              </div>
            </div>

            <p className="text-center text-white/35 text-sm mt-10">
              © 2026 • Built with React Three Fiber
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

/* ---------- UI atoms ---------- */

function ProgressPill({ value }: { value: number }) {
  const pct = Math.max(0, Math.min(1, value));
  return (
    <div className="relative h-8 w-24 rounded-full border border-white/15 bg-black/30 overflow-hidden">
      <div
        className="absolute inset-y-0 left-0 bg-white/20"
        style={{ width: `${pct * 100}%` }}
      />
      <div className="relative z-10 h-full flex items-center justify-center text-[10px] tracking-[0.22em] uppercase text-white/65">
        {(pct * 100).toFixed(0)}%
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
      <div className="text-2xl font-semibold">{value}</div>
      <div className="text-[10px] tracking-[0.28em] uppercase text-white/45 mt-1">
        {label}
      </div>
    </div>
  );
}

function Card({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-7 hover:bg-white/7 transition">
      <div className="text-lg font-semibold text-white">{title}</div>
      <div className="mt-3 text-white/65 leading-relaxed">{desc}</div>
    </div>
  );
}

function LineItem({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="flex gap-3">
      <div className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300/80 flex-shrink-0" />
      <div>
        <div className="font-semibold text-white/85">{title}</div>
        <div className="text-white/60">{desc}</div>
      </div>
    </div>
  );
}
