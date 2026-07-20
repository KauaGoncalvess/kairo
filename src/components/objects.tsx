"use client";

// Objetos 3D "de produto" por serviço — WebGL em tempo real com material
// glossy e luz de estúdio (RoomEnvironment procedural, zero assets externos).

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, extend, type ThreeElement } from "@react-three/fiber";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { usePRM } from "@/lib/fx";
import type { Service } from "@/config/site";

extend({ RoundedBoxGeometry });
declare module "@react-three/fiber" {
  interface ThreeElements {
    roundedBoxGeometry: ThreeElement<typeof RoundedBoxGeometry>;
  }
}

// Luz de estúdio procedural aplicada na criação do canvas (sem hooks — lint-safe)
const studio = ({ gl, scene }: { gl: THREE.WebGLRenderer; scene: THREE.Scene }) => {
  const pmrem = new THREE.PMREMGenerator(gl);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  pmrem.dispose();
};

const glossy = (color: string) => (
  <meshPhysicalMaterial color={color} roughness={0.16} metalness={0.08} clearcoat={1} clearcoatRoughness={0.12} envMapIntensity={1.25} />
);
const dark = <meshPhysicalMaterial color="#171a24" roughness={0.28} metalness={0.35} clearcoat={0.7} clearcoatRoughness={0.2} />;
const light = <meshPhysicalMaterial color="#f5f6f8" roughness={0.2} metalness={0.02} clearcoat={0.9} clearcoatRoughness={0.15} />;

function Obj({ id, accent }: { id: string; accent: string }) {
  const g = useRef<THREE.Group>(null);
  const parts = useRef<(THREE.Group | null)[]>([]);
  useEffect(() => {
    g.current?.traverse((o) => { o.castShadow = true; });
  }, []);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (g.current) {
      g.current.rotation.y = t * 0.55;
      g.current.position.y = Math.sin(t * 1.1) * 0.07;
    }
    if (id === "dados") {
      parts.current.forEach((m, i) => { if (m) m.scale.y = 0.45 + 0.55 * (0.5 + 0.5 * Math.sin(t * 1.5 + i * 1.1)); });
    }
    if (id === "ia") {
      parts.current.forEach((m, i) => { if (m) m.rotation.y = t * (0.9 + i * 0.4); });
    }
  });

  switch (id) {
    case "software": // torre de blocos empilhados
      return (
        <group ref={g}>
          {[-0.5, 0.02, 0.54].map((y, i) => (
            <mesh key={i} position={[0, y, 0]} rotation={[0, i * 0.55, 0]}>
              <roundedBoxGeometry args={[1.15 - i * 0.22, 0.44, 1.15 - i * 0.22, 4, 0.1]} />
              {i === 1 ? glossy(accent) : dark}
            </mesh>
          ))}
        </group>
      );
    case "saas": // janela de produto web com cards flutuando
      return (
        <group ref={g}>
          <mesh><roundedBoxGeometry args={[1.7, 1.15, 0.1, 4, 0.05]} />{dark}</mesh>
          <mesh position={[0, 0.44, 0.06]}><roundedBoxGeometry args={[1.56, 0.18, 0.02, 3, 0.02]} />{light}</mesh>
          <mesh position={[-0.45, -0.12, 0.18]} rotation={[0, 0.15, 0]}><roundedBoxGeometry args={[0.55, 0.5, 0.06, 3, 0.03]} />{glossy(accent)}</mesh>
          <mesh position={[0.35, -0.2, 0.28]} rotation={[0, -0.2, 0]}><roundedBoxGeometry args={[0.7, 0.34, 0.06, 3, 0.03]} />{light}</mesh>
        </group>
      );
    case "ia": // núcleo + elétrons orbitando
      return (
        <group ref={g}>
          <mesh><sphereGeometry args={[0.5, 48, 48]} />{glossy(accent)}</mesh>
          {[0, 1].map((i) => (
            <group key={i} ref={(el) => { parts.current[i] = el; }} rotation={[i === 0 ? 0.9 : -0.7, 0, i === 0 ? 0.3 : -0.4]}>
              <mesh position={[0.95, 0, 0]}><sphereGeometry args={[0.13, 24, 24]} />{light}</mesh>
              <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.95, 0.015, 12, 80]} />{dark}</mesh>
            </group>
          ))}
        </group>
      );
    case "automacoes": { // cabeça de robô — bot na hora
      const eye = <meshPhysicalMaterial color={accent} emissive={accent} emissiveIntensity={1.6} roughness={0.2} clearcoat={1} />;
      return (
        <group ref={g}>
          <mesh><roundedBoxGeometry args={[1.15, 0.95, 0.95, 4, 0.18]} />{dark}</mesh>
          <mesh position={[-0.26, 0.08, 0.48]}><sphereGeometry args={[0.13, 24, 24]} />{eye}</mesh>
          <mesh position={[0.26, 0.08, 0.48]}><sphereGeometry args={[0.13, 24, 24]} />{eye}</mesh>
          <mesh position={[0, -0.24, 0.49]}><roundedBoxGeometry args={[0.42, 0.07, 0.02, 2, 0.02]} />{light}</mesh>
          <mesh position={[0, 0.62, 0]}><cylinderGeometry args={[0.03, 0.03, 0.3, 12]} />{light}</mesh>
          <mesh position={[0, 0.82, 0]}><sphereGeometry args={[0.09, 16, 16]} />{eye}</mesh>
        </group>
      );
    }
    case "whatsapp": // celular com notificações flutuando (ref. Orby)
      return (
        <group ref={g}>
          <mesh rotation={[-0.15, 0, 0]}><roundedBoxGeometry args={[0.8, 1.55, 0.13, 4, 0.07]} />{dark}</mesh>
          <mesh position={[0.5, 0.5, 0.4]} rotation={[0, -0.45, 0.06]}><roundedBoxGeometry args={[0.9, 0.34, 0.07, 4, 0.035]} />{glossy(accent)}</mesh>
          <mesh position={[-0.45, -0.05, 0.5]} rotation={[0, 0.4, -0.05]}><roundedBoxGeometry args={[0.75, 0.3, 0.07, 4, 0.035]} />{light}</mesh>
          <mesh position={[0.35, -0.6, 0.45]} rotation={[0, -0.3, 0.04]}><roundedBoxGeometry args={[0.6, 0.26, 0.07, 4, 0.035]} />{light}</mesh>
        </group>
      );
    case "apps": // celular de pé com tela viva
      return (
        <group ref={g}>
          <mesh><roundedBoxGeometry args={[0.85, 1.7, 0.14, 4, 0.08]} />{dark}</mesh>
          <mesh position={[0, 0, 0.075]}><roundedBoxGeometry args={[0.72, 1.55, 0.02, 4, 0.04]} />{glossy(accent)}</mesh>
          <mesh position={[0, -0.68, 0.09]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.07, 0.07, 0.02, 24]} />{light}</mesh>
        </group>
      );
    case "dados": // gráfico 3D crescendo
      return (
        <group ref={g} rotation={[0.25, 0, 0]} position={[0, -0.4, 0]}>
          {[0.9, 0.55, 1.15, 0.7, 1.35].map((h, i) => (
            <group key={i} ref={(el) => { parts.current[i] = el; }} position={[(i - 2) * 0.38, 0, 0]}>
              <mesh position={[0, h / 2, 0]}>
                <roundedBoxGeometry args={[0.28, h, 0.28, 3, 0.05]} />
                {i === 4 ? glossy(accent) : i % 2 ? light : dark}
              </mesh>
            </group>
          ))}
        </group>
      );
    default: // consultoria: nó premium
      return (
        <group ref={g}>
          <mesh><torusKnotGeometry args={[0.58, 0.19, 140, 24]} />{glossy(accent)}</mesh>
        </group>
      );
  }
}

export default function Card3D({ s, className = "" }: { s: Service; className?: string }) {
  const prm = usePRM();
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { rootMargin: "120px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} aria-hidden>
      {on && !prm ? (
        <Canvas shadows camera={{ position: [0, 0.7, 3.6], fov: 38 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }} style={{ width: "100%", height: "100%" }} onCreated={studio}>
          <ambientLight intensity={0.25} />
          <directionalLight position={[3, 4, 2]} intensity={1.3} castShadow shadow-mapSize={[512, 512]} shadow-bias={-0.0004} />
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.15, 0]} receiveShadow>
            <circleGeometry args={[2.4, 48]} />
            <shadowMaterial transparent opacity={0.35} />
          </mesh>
          <pointLight position={[-3, -1, 3]} intensity={30} color={s.accent} />
          <Obj id={s.id} accent={s.accent} />
        </Canvas>
      ) : (
        <div className="h-full w-full rounded-xl"
          style={{ background: `radial-gradient(60% 70% at 50% 60%, color-mix(in oklab, ${s.accent} 25%, transparent), transparent)` }} />
      )}
    </div>
  );
}
