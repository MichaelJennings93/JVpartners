import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const COUNT = 600

/**
 * Gold particle field that coalesces into an implied "V" silhouette
 * in the right third of the hero, then loosens to 40% cohesion.
 * Cursor repels particles within a fixed radius (spring-back via lerp decay).
 */
function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null)
  const cohesionRef = useRef(0) // 0 -> 1 on load, settles to 0.4
  const startRef = useRef<number | null>(null)

  const { base, drift, phase, displacements } = useMemo(() => {
    const base = new Float32Array(COUNT * 3)
    const drift = new Float32Array(COUNT * 3)
    const phase = new Float32Array(COUNT)
    const displacements = new Float32Array(COUNT * 3)

    for (let i = 0; i < COUNT; i++) {
      // Parametric V: two strokes meeting at bottom-centre, right third of viewport
      const t = Math.random()
      const side = Math.random() < 0.5 ? -1 : 1
      const jitter = () => (Math.random() - 0.5) * 0.22
      // V spans x: -0.55..0.55, y: 0.7 top -> -0.75 bottom (in local units, scaled later)
      const x = side * 0.55 * (1 - t) + jitter()
      const y = 0.7 - 1.45 * t + jitter()
      base[i * 3] = x
      base[i * 3 + 1] = y
      base[i * 3 + 2] = (Math.random() - 0.5) * 0.3

      // Loose scattered drift positions (start/end state around the V)
      drift[i * 3] = (Math.random() - 0.5) * 2.2
      drift[i * 3 + 1] = (Math.random() - 0.5) * 1.8
      drift[i * 3 + 2] = (Math.random() - 0.5) * 0.6

      phase[i] = Math.random() * Math.PI * 2
    }
    return { base, drift, phase, displacements }
  }, [])

  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3)
    arr.set(drift)
    return arr
  }, [drift])

  useFrame((state) => {
    const pts = pointsRef.current
    if (!pts) return
    if (startRef.current === null) startRef.current = state.clock.elapsedTime
    const elapsed = state.clock.elapsedTime - startRef.current

    // Coalesce over 2s, then loosen to 0.4 cohesion
    let target = Math.min(elapsed / 2, 1)
    target = target * target * (3 - 2 * target) // smoothstep
    if (elapsed > 2.6) {
      target = 0.4 + 0.6 * Math.max(0, 1 - (elapsed - 2.6) / 1.5)
    }
    cohesionRef.current += (target - cohesionRef.current) * 0.05
    const cohesion = cohesionRef.current

    // Cursor in world coords (z = 0 plane)
    const px = state.pointer.x * state.viewport.width * 0.5
    const py = state.pointer.y * state.viewport.height * 0.5
    const radius = 1.2 // ~120px equivalent in world units at hero scale

    const posAttr = pts.geometry.getAttribute('position') as THREE.BufferAttribute
    const time = state.clock.elapsedTime

    for (let i = 0; i < COUNT; i++) {
      const ix = i * 3
      // Idle noise-based drift (~8px amplitude)
      const nx = Math.sin(time * 0.6 + phase[i]) * 0.08
      const ny = Math.cos(time * 0.5 + phase[i] * 1.3) * 0.08

      const targetX = drift[ix] + (base[ix] - drift[ix]) * cohesion + nx
      const targetY = drift[ix + 1] + (base[ix + 1] - drift[ix + 1]) * cohesion + ny
      const targetZ = drift[ix + 2] + (base[ix + 2] - drift[ix + 2]) * cohesion

      // Cursor repulsion with lerp decay
      const worldX = targetX * 2.2 + 1.6 // matches group scale/position
      const worldY = targetY * 2.2
      const dx = worldX - px
      const dy = worldY - py
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < radius && dist > 0.0001) {
        const force = ((radius - dist) / radius) * 0.06
        displacements[ix] += (dx / dist) * force
        displacements[ix + 1] += (dy / dist) * force
      }
      displacements[ix] *= 0.95
      displacements[ix + 1] *= 0.95
      displacements[ix + 2] *= 0.95

      posAttr.setXYZ(
        i,
        targetX + displacements[ix],
        targetY + displacements[ix + 1],
        targetZ + displacements[ix + 2],
      )
    }
    posAttr.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#C9A05A"
        size={0.028}
        sizeAttenuation
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default function HeroParticles() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 50 }}
        dpr={[1, 1.75]}
        gl={{ alpha: true, antialias: true }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      >
        <group position={[1.6, 0, 0]} scale={2.2}>
          <ParticleField />
        </group>
      </Canvas>
    </div>
  )
}
