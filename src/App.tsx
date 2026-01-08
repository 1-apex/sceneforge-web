import { useEffect, useRef, useState } from "react";
import { Code, Zap, Box } from "lucide-react";
import { SceneCanvas } from "./SceneCanvas";

export default function App() {
  const heroRef = useRef(null);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowHint(entry.isIntersecting);
      },
      {
        threshold: 0.4, // tweak: lower = hides earlier
      }
    );

    if (heroRef.current) observer.observe(heroRef.current);

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <Code size={24} />,
      title: "Copy & Paste Ready",
      description:
        "Generated React components ready to drop into your projects",
    },
    {
      icon: <Zap size={24} />,
      title: "Lightweight",
      description: "Optimized meshes with minimal bundle impact",
    },
    {
      icon: <Box size={24} />,
      title: "Fully Customizable",
      description: "Modify colors, positions, and properties on the fly",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated Background Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20" />

      {/* Gradient Orbs */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-[120px] animate-pulse" />
      <div
        className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-[120px] animate-pulse"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[130px] animate-pulse"
        style={{ animationDelay: "4s" }}
      />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen grid lg:grid-cols-2 items-center gap-12 px-6 lg:px-12"
      >
        {/* Left Content */}
        <div className="relative z-10 space-y-10 max-w-3xl mx-auto lg:mx-0 py-20">
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-400/20 rounded-full text-blue-300 text-sm font-semibold backdrop-blur-xl shadow-2xl shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500 shadow-lg shadow-blue-500/50"></span>
              </span>
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                SceneForge Beta • Now Live
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-7xl lg:text-9xl font-black bg-gradient-to-br from-white via-blue-100 to-blue-600 bg-clip-text text-transparent leading-[0.9] tracking-tight">
              Create 3D
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Scenes
              </span>
              <br />
              In Seconds
            </h1>

            {/* Subheading */}
            <p className="text-2xl lg:text-3xl text-slate-400 max-w-2xl leading-relaxed font-light">
              Generate{" "}
              <span className="text-blue-400 font-semibold">
                production-ready
              </span>{" "}
              React Three Fiber components with our visual editor.
              <span className="text-purple-400 font-semibold">
                {" "}
                No 3D modeling experience
              </span>{" "}
              required.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-5">
            <button className="group relative px-14 py-7 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl font-black text-xl hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 transition-all duration-500 shadow-2xl shadow-blue-500/50 hover:shadow-purple-500/60 hover:scale-110 transform overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-purple-600/0 to-pink-600/0 group-hover:from-blue-600/10 group-hover:via-purple-600/10 group-hover:to-pink-600/10 transition-all duration-500" />
              <span className="relative z-10">
                Try SceneForge Free - Create your own 3D Scene
              </span>
            </button>
          </div>
        </div>

        {/* Right 3D Canvas - MUCH LARGER */}
        <div className="relative h-full min-h-[700px] lg:min-h-screen flex items-center justify-center">
          {/* Canvas Container with enhanced styling */}
          <div className="relative w-full h-full">
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/10 to-black/60 z-10 pointer-events-none" />

            {/* Main Canvas */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden">
              <SceneCanvas />
            </div>

            {/* Glow effects */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/30 via-purple-500/20 to-pink-500/30 rounded-[3rem] blur-3xl -z-10 animate-pulse" />
            <div className="absolute -inset-8 bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-purple-500/20 rounded-[4rem] blur-[100px] -z-20" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-40 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-24 space-y-8">
            <div className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/20 rounded-full text-blue-300 text-sm font-bold backdrop-blur-xl mb-4">
              FEATURES
            </div>
            <h2 className="text-6xl lg:text-8xl font-black bg-gradient-to-br from-white via-blue-200 to-purple-400 bg-clip-text text-transparent leading-tight">
              Why SceneForge?
            </h2>
            <p className="text-2xl lg:text-3xl text-slate-400 max-w-4xl mx-auto leading-relaxed font-light">
              Built for developers who want{" "}
              <span className="text-blue-400 font-semibold">stunning 3D</span>{" "}
              without the complexity
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group relative p-10 bg-gradient-to-br from-slate-900/80 via-slate-800/50 to-slate-900/80 backdrop-blur-2xl border border-slate-700/50 rounded-[2rem] hover:border-blue-500/50 transition-all duration-700 cursor-pointer hover:scale-105 transform hover:shadow-2xl hover:shadow-blue-500/30 overflow-hidden"
              >
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/5 group-hover:to-pink-500/10 transition-all duration-700" />

                {/* Icon */}
                <div className="relative w-20 h-20 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl flex items-center justify-center text-blue-400 mb-8 group-hover:from-blue-500/40 group-hover:via-purple-500/40 group-hover:to-pink-500/40 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 transform shadow-xl shadow-blue-500/30">
                  {feature.icon}
                </div>

                {/* Content */}
                <h3 className="relative text-3xl font-black mb-5 group-hover:text-blue-300 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="relative text-lg text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-40 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Main CTA Card */}
          <div className="relative p-16 lg:p-24 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-2xl border border-blue-400/30 rounded-[3rem] overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/30 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/30 rounded-full blur-[120px]" />

            {/* Content */}
            <div className="relative text-center space-y-12">
              <h2 className="text-6xl lg:text-8xl font-black bg-gradient-to-br from-white via-blue-200 to-purple-300 bg-clip-text text-transparent leading-tight">
                Ready to Start
                <br />
                Building?
              </h2>
              <p className="text-2xl lg:text-3xl text-slate-300 max-w-4xl mx-auto leading-relaxed font-light">
                Be <span className="text-blue-400 font-bold">a developer</span>{" "}
                creating next-generation web experiences
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap justify-center gap-6 pt-8">
                <button className="group relative px-14 py-7 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl font-black text-xl hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 transition-all duration-500 shadow-2xl shadow-blue-500/50 hover:shadow-purple-500/60 hover:scale-110 transform overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                  <span className="relative z-10">Try SceneForge Free</span>
                </button>

                <button className="group relative px-14 py-7 border-2 border-slate-600 rounded-2xl font-black text-xl hover:border-blue-400 transition-all duration-500 backdrop-blur-xl hover:scale-110 transform shadow-xl hover:shadow-2xl hover:shadow-blue-500/40 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-purple-600/0 to-pink-600/0 group-hover:from-blue-600/20 group-hover:via-purple-600/20 group-hover:to-pink-600/20 transition-all duration-500" />
                  <span className="relative z-10">View Documentation</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating interaction hint */}
      <div
        className={`fixed bottom-8 right-8 px-8 py-4
    bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-slate-900/95
    backdrop-blur-2xl border border-blue-500/30 rounded-2xl text-base text-slate-300
    shadow-2xl shadow-blue-500/30
    transition-all duration-500
    ${
      showHint
        ? "opacity-100 scale-100"
        : "opacity-0 scale-95 pointer-events-none"
    }
  `}
      >
        <span className="flex items-center gap-3 font-semibold">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500 shadow-lg shadow-blue-500/50"></span>
          </span>
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Drag to rotate
          </span>
        </span>
      </div>
    </div>
  );
}
