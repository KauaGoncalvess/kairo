"use client";

// Cena WebGL do hero: campo de partículas orbitais com luz que respira,
// reagindo ao mouse (parallax) e ao scroll (dolly de câmera).

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uScroll;
  attribute float aScale;
  attribute float aSpeed;
  varying float vDist;
  void main() {
    vec3 p = position;
    float a = uTime * 0.05 * aSpeed;
    float c = cos(a), s = sin(a);
    p.xz = mat2(c, -s, s, c) * p.xz;                 // órbita lenta
    p.y += sin(uTime * 0.4 * aSpeed + position.x) * 0.35; // deriva vertical
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    mv.z += uScroll * 6.0;                            // dolly no scroll
    vDist = length(p.xz);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aScale * 26.0 / max(0.001, -mv.z);
  }
`;

const fragment = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uTime;
  varying float vDist;
  void main() {
    float d = distance(gl_PointCoord, vec2(0.5));
    if (d > 0.5) discard;
    float glow = smoothstep(0.5, 0.0, d);
    float breathe = 0.75 + 0.25 * sin(uTime * 0.8 + vDist * 1.5);
    vec3 col = mix(uColorA, uColorB, smoothstep(1.0, 7.0, vDist));
    gl_FragColor = vec4(col, glow * breathe * 0.9);
  }
`;

// PRNG determinístico (mulberry32): mantém a geração pura e reproduzível
function makeGalaxy(count: number) {
  let seed = 1337;
  const rnd = () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const positions = new Float32Array(count * 3);
  const scales = new Float32Array(count);
  const speeds = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    // galáxia achatada: anéis com densidade decrescente
    const r = 1.2 + Math.pow(rnd(), 0.6) * 7;
    const t = rnd() * Math.PI * 2;
    positions[i * 3] = Math.cos(t) * r;
    positions[i * 3 + 1] = (rnd() - 0.5) * 1.6 * (r / 7);
    positions[i * 3 + 2] = Math.sin(t) * r;
    scales[i] = 0.5 + rnd() * 1.6;
    speeds[i] = 0.4 + rnd() * 1.4;
  }
  return { positions, scales, speeds };
}

function Particles({ count }: { count: number }) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const group = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  const { positions, scales, speeds } = useMemo(() => makeGalaxy(count), [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uColorA: { value: new THREE.Color("#7c6cff") },
      uColorB: { value: new THREE.Color("#4adede") },
    }),
    []
  );

  useFrame(({ clock, pointer }) => {
    if (!mat.current || !group.current) return;
    mat.current.uniforms.uTime.value = clock.elapsedTime;
    mat.current.uniforms.uScroll.value = Math.min(1.4, window.scrollY / window.innerHeight);
    // parallax suave do grupo em direção ao mouse
    mouse.current.x += (pointer.x - mouse.current.x) * 0.04;
    mouse.current.y += (pointer.y - mouse.current.y) * 0.04;
    group.current.rotation.y = mouse.current.x * 0.25;
    group.current.rotation.x = 0.42 + mouse.current.y * 0.12;
  });

  return (
    <group ref={group} rotation={[0.42, 0, 0]}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
          <bufferAttribute attach="attributes-aSpeed" args={[speeds, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={mat}
          vertexShader={vertex}
          fragmentShader={fragment}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

export default function Scene() {
  // menos partículas em telas pequenas / devices modestos
  const small = typeof window !== "undefined" && window.innerWidth < 768;
  const mem = typeof navigator !== "undefined" ? (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8 : 8;
  const count = small || mem <= 4 ? 1800 : 4500;

  return (
    <Canvas
      camera={{ position: [0, 1.6, 9], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, powerPreference: "high-performance", alpha: true }}
      style={{ position: "absolute", inset: 0 }}
      aria-hidden
    >
      <Particles count={count} />
    </Canvas>
  );
}
