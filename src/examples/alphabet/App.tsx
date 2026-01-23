import { useEffect, useState, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { Scene } from './Scene'
import { ArrowLeft } from 'lucide-react'

function clamp01(v: number) {
    return Math.min(1, Math.max(0, v))
}

function useScrollProgress() {
    const [scrollProgress, setScrollProgress] = useState(0)

    useEffect(() => {
        const computeProgress = () => {
            const doc = document.documentElement
            const max = doc.scrollHeight - window.innerHeight
            if (max <= 0) return 0
            return clamp01(window.scrollY / max)
        }

        const onScroll = () => {
            // Use requestAnimationFrame for smoother updates if needed, 
            // but react state updates are usually batched enough.
            setScrollProgress(computeProgress())
        }
        const onResize = () => setScrollProgress(computeProgress())

        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('resize', onResize)

        return () => {
            window.removeEventListener('scroll', onScroll)
            window.removeEventListener('resize', onResize)
        }
    }, [])

    return scrollProgress
}

export default function AlphabetApp() {
    const scrollProgress = useScrollProgress()
    const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    // Determine active character index based on scroll
    const activeIndex = useMemo(() => {
        return Math.min(
            CHARS.length - 1,
            Math.max(0, Math.round(scrollProgress * (CHARS.length - 1)))
        )
    }, [scrollProgress])

    const activeChar = CHARS[activeIndex]

    return (
        <div className="relative min-h-[500vh] bg-neutral-950 text-white selection:bg-purple-500/30">
            {/* 
         min-h-[500vh] gives us plenty of scroll room. 
         The canvas is fixed behind everything.
      */}

            <div className="fixed inset-0 z-0">
                <Canvas
                    camera={{ position: [0, 0, 6], fov: 45 }}
                    dpr={[1, 2]}
                    gl={{
                        antialias: true,
                        toneMapping: THREE.ACESFilmicToneMapping,
                        toneMappingExposure: 1.2
                    }}
                >
                    <Scene scrollProgress={scrollProgress} />
                </Canvas>

                {/* Subtle vignetting overlay */}
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#000000_120%)] opacity-80" />
            </div>

            {/* UI Overlay */}
            <div className="fixed inset-0 z-10 pointer-events-none flex flex-col justify-between p-8 md:p-12">
                {/* Header */}
                <header className="flex justify-between items-start pointer-events-auto">
                    <a
                        href="/examples"
                        className="group flex items-center gap-2 text-sm font-medium text-white/50 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        Back to Examples
                    </a>

                    <div className="text-right">
                        <h1 className="text-xl font-bold tracking-tight">Alphabet Portfolio</h1>
                        <p className="text-xs text-white/40 uppercase tracking-widest mt-1">Experimental 3D Carousel</p>
                    </div>
                </header>

                {/* Footer / Progress */}
                <footer className="w-full flex justify-between items-end">
                    <div className="flex flex-col gap-1">
                        <span className="text-xs uppercase tracking-widest text-white/30">Current</span>
                        <span className="text-4xl font-light text-white">{activeChar}</span>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                        <span className="text-xs uppercase tracking-widest text-white/30">Progress</span>
                        <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)] transition-all duration-75 ease-out"
                                style={{ width: `${Math.min(100, scrollProgress * 100)}%` }}
                            />
                        </div>
                        <div className="text-xs font-mono text-white/50">
                            {Math.round(scrollProgress * 100).toString().padStart(3)}%
                        </div>
                    </div>
                </footer>
            </div>

            {/* Scroll indicator hint - only visible at top */}
            <div
                className="fixed bottom-10 left-1/2 -translate-x-1/2 text-white/20 text-sm animate-pulse z-20 pointer-events-none transition-opacity duration-500"
                style={{ opacity: scrollProgress > 0.1 ? 0 : 1 }}
            >
                Scroll to explore
            </div>
        </div>
    )
}
