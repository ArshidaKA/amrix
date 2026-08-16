"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ACCENT = "#9db4ff";
const LINE = "#f4f4f2";

function Node({ position, delay = 0 }: { position: [number, number, number]; delay?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 2 + delay) * 0.25;
      ref.current.scale.setScalar(s);
    }
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.07, 12, 12]} />
      <meshBasicMaterial color={ACCENT} />
    </mesh>
  );
}

function AutomationScene() {
  const group = useRef<THREE.Group>(null);
  const nodes: [number, number, number][] = [
    [-1.1, 0.6, 0],
    [1.1, 0.6, 0],
    [0, -0.7, 0.3],
    [0, 0.9, -0.6],
  ];
  const linePts = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        pts.push(new THREE.Vector3(...nodes[i]), new THREE.Vector3(...nodes[j]));
      }
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, []);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.25;
  });

  return (
    <group ref={group}>
      <lineSegments geometry={linePts}>
        <lineBasicMaterial color={LINE} transparent opacity={0.35} />
      </lineSegments>
      {nodes.map((p, i) => (
        <Node key={i} position={p} delay={i} />
      ))}
    </group>
  );
}

function StudioScene() {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.2;
    if (inner.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 1.6) * 0.06;
      inner.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshBasicMaterial color={LINE} wireframe transparent opacity={0.35} />
      </mesh>
      <mesh ref={inner}>
        <icosahedronGeometry args={[0.4, 0]} />
        <meshBasicMaterial color={ACCENT} wireframe transparent opacity={0.9} />
      </mesh>
    </group>
  );
}

function DigitalExperienceScene() {
  const group = useRef<THREE.Group>(null);
  const cursor = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (group.current) group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.25;
    if (cursor.current) {
      cursor.current.position.x = Math.sin(state.clock.elapsedTime * 0.8) * 0.7;
      cursor.current.position.y = Math.cos(state.clock.elapsedTime * 0.6) * 0.4;
    }
  });

  return (
    <group ref={group}>
      <mesh>
        <planeGeometry args={[2.1, 1.4, 6, 4]} />
        <meshBasicMaterial color={LINE} wireframe transparent opacity={0.3} />
      </mesh>
      <mesh ref={cursor}>
        <circleGeometry args={[0.06, 16]} />
        <meshBasicMaterial color={ACCENT} />
      </mesh>
    </group>
  );
}

function MarketingScene() {
  const group = useRef<THREE.Group>(null);
  const bars = useRef<THREE.Mesh[]>([]);
  const heights = [0.8, 1.4, 1.9];

  useFrame((state) => {
    if (group.current) group.current.rotation.y += 0.002;
    bars.current.forEach((b, i) => {
      if (!b) return;
      const s = heights[i] * (0.7 + 0.3 * Math.abs(Math.sin(state.clock.elapsedTime * 0.9 + i * 0.6)));
      b.scale.y = s;
      b.position.y = (s * 0.5) - 1;
    });
  });

  return (
    <group ref={group}>
      {heights.map((h, i) => (
        <mesh key={i} ref={(el) => { if (el) bars.current[i] = el; }} position={[(i - 1) * 0.6, 0, 0]}>
          <boxGeometry args={[0.35, 1, 0.35]} />
          <meshBasicMaterial color={i === 2 ? ACCENT : LINE} wireframe transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

function AuditScene() {
  const group = useRef<THREE.Group>(null);
  const scan = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.2;
    if (scan.current) {
      scan.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.8;
    }
  });

  return (
    <group ref={group}>
      <mesh>
        <octahedronGeometry args={[1.1, 0]} />
        <meshBasicMaterial color={LINE} wireframe transparent opacity={0.35} />
      </mesh>
      <mesh ref={scan}>
        <ringGeometry args={[0.75, 0.8, 24]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.7} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

const SCENES = {
  automation: AutomationScene,
  studio: StudioScene,
  digital: DigitalExperienceScene,
  marketing: MarketingScene,
  audit: AuditScene,
} as const;

export type ServiceSceneVariant = keyof typeof SCENES;

export default function ServiceScene3D({ variant }: { variant: ServiceSceneVariant }) {
  const Scene = SCENES[variant];
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 3.6], fov: 40 }} dpr={[1, 1.5]}>
        <Scene />
      </Canvas>
    </div>
  );
}
