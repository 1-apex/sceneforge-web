import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, RoundedBox, Environment } from '@react-three/drei'
import * as THREE from 'three'

// Data: A-Z
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('')
const SPACING = 2.5 // Distance between cubes

function damp(current: number, target: number, lambda: number, dt: number) {
    return THREE.MathUtils.damp(current, target, lambda, dt)
}

export function Scene({ scrollProgress }: { scrollProgress: number }) {
    const groupRef = useRef<THREE.Group>(null)

    // Create a stable array of refs for our cubes
    // We can't easily loop hooks, so we map the data in render
    // but we need mutable access for animations

    // Calculate total scroll length based on items
    // changing scrollProgress (0..1) to an index (0..CHARS.length-1)
    const totalWidth = (CHARS.length - 1) * SPACING

    useFrame((state, dt) => {
        if (!groupRef.current) return

        // Calculate target X position for the whole group based on scroll
        // We want to scroll from first item to last item
        // Scroll 0 => Item 0 is center
        // Scroll 1 => Item Last is center
        const targetX = -scrollProgress * totalWidth

        // Smoothly damp the group position for that "flow" feel
        // Using a lower lambda for "weighty" feel
        groupRef.current.position.x = damp(groupRef.current.position.x, targetX, 5, dt)

        // Animate children (The cubes)
        // We want the one near world X=0 to be big, others small

        // Get world position X of group to know offset
        const currentGroupX = groupRef.current.position.x

        // Iterate through children
        groupRef.current.children.forEach((child, index) => {
            // The local x of this child is index * SPACING
            const localX = index * SPACING
            const worldX = currentGroupX + localX

            // Distance from center screen (0)
            const dist = Math.abs(worldX)

            // Calculate scale based on distance (Gaussian-ish bell curve)
            // Peak at 1.0 (or slightly larger), fall off to 0.6
            const falloff = 0.35 // How quickly it shrinks
            // e^(-x^2)
            let scale = 0.6 + 0.9 * Math.exp(-((dist * falloff) ** 2))

            // Add a bit of "breathe" to the center one
            if (dist < 1) {
                scale += Math.sin(state.clock.elapsedTime * 2) * 0.02
            }

            // Smoothly update scale
            child.scale.setScalar(damp(child.scale.x, scale, 10, dt))

            // Rotate based on distance (make them turn to face center slightly?)
            // Or just continuous rotation
            const rotY = dist * 0.1 * (worldX > 0 ? -1 : 1)
            // Add some constant slow spin
            // const constantSpin = state.clock.elapsedTime * 0.1
            child.rotation.y = damp(child.rotation.y, rotY, 5, dt)
            child.rotation.x = damp(child.rotation.x, Math.sin(state.clock.elapsedTime + index) * 0.05, 5, dt)

            // Fade/Blur simulation via Opacity or Color
            // We can't easily change transparency per frame without issues unless we handle render order
            // but we can darken them or change roughness
            const material = (child as any).children[0].material
            if (material) {
                // Highlight center: brighter, more metallic
                // Side: deeper color, rougher?
                // const proximity = Math.max(0, 1 - dist / 5) // 0..1 (1 is center)

                // Color interpolation
                // Center: #9d4ad9 (Purple) -> Side: 
                // Let's cycle colors per cube actually, that's "dope"
                // But modulate intensity by proximity
            }
        })
    })

    // Generate colors - Rainbow gradient or curated palette
    const getDopeColor = (i: number) => {
        // Nice gradient: Purple -> Cyan -> Blue -> Pink
        const colors = ["#9d4ad9", "#4a90d9", "#4ad9d9", "#d94a90", "#d9904a"]
        return colors[i % colors.length]
    }

    return (
        <>
            {/* Cinematic Lighting */}
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
            <directionalLight position={[-10, 5, 2]} intensity={1.0} color="#bfe7ff" />
            {/* Rim light for metallic edges */}
            <spotLight position={[0, 10, -5]} intensity={5} color="#ff00ff" angle={0.5} penumbra={1} />

            <Environment preset="city" /> {/* Adds nice reflections for metal */}

            <group ref={groupRef}>
                {CHARS.map((char, i) => (
                    <group key={i} position={[i * SPACING, 0, 0]}>
                        <RoundedBox
                            args={[1.5, 1.5, 1.5]} // Slightly larger cubes
                            radius={0.2}
                            smoothness={8}
                        >
                            <meshStandardMaterial
                                color={getDopeColor(i)}
                                metalness={0.8}
                                roughness={0.15}
                                envMapIntensity={1.5}
                            />
                            <group position={[0, 0, 0.76]}>
                                <Text
                                    fontSize={1.0}
                                    color="#ffffff"
                                    anchorX="center"
                                    anchorY="middle"
                                    font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff" // Standard safe font or default
                                >
                                    {char}
                                </Text>
                            </group>
                        </RoundedBox>
                    </group>
                ))}
            </group>

            {/* Optional: Floor reflection or particles could go here */}
        </>
    )
}
