"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Build a triangulated pyramid (square base) as a set of edges for a wireframe look,
// plus a scatter of "data point" vertices that assemble into the shape.
function useSideVertices() {
  return useMemo(() => {
    const apex = new THREE.Vector3(0, 1.6, 0);
    const base = [
      new THREE.Vector3(-1.3, -0.9, -1.3),
      new THREE.Vector3(1.3, -0.9, -1.3),
      new THREE.Vector3(1.3, -0.9, 1.3),
      new THREE.Vector3(-1.3, -0.9, 1.3),
    ];
    return { apex, base };
  }, []);
}

function WireframePyramid() {
  const group = useRef<THREE.Group>(null);
  const { apex, base } = useSideVertices();

  const edgeGeometry = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    // base edges
    for (let i = 0; i < 4; i++) {
      pts.push(base[i], base[(i + 1) % 4]);
    }
    // sides
    for (let i = 0; i < 4; i++) {
      pts.push(apex, base[i]);
    }
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    return geo;
  }, [apex, base]);

  // Fine internal triangulation lines for a "data mesh" feel
  const meshLines = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const steps = 5;
    for (let i = 0; i < 4; i++) {
      const b0 = base[i];
      const b1 = base[(i + 1) % 4];
      for (let s = 1; s < steps; s++) {
        const t = s / steps;
        const p = new THREE.Vector3().lerpVectors(b0, b1, t);
        pts.push(apex, p);
      }
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [apex, base]);

  const pointsGeo = useMemo(() => {
    const pts: THREE.Vector3[] = [apex, ...base];
    const steps = 6;
    for (let i = 0; i < 4; i++) {
      const b0 = base[i];
      const b1 = base[(i + 1) % 4];
      for (let s = 1; s < steps; s++) {
        pts.push(new THREE.Vector3().lerpVectors(b0, b1, s / steps));
      }
      for (let s = 1; s < steps; s++) {
        pts.push(new THREE.Vector3().lerpVectors(apex, b0, s / steps));
      }
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [apex, base]);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.12;
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.06;
    }
  });

  return (
    <group ref={group}>
      <lineSegments geometry={edgeGeometry}>
        <lineBasicMaterial color="#f4f4f2" transparent opacity={0.85} />
      </lineSegments>
      <lineSegments geometry={meshLines}>
        <lineBasicMaterial color="#9db4ff" transparent opacity={0.18} />
      </lineSegments>
      <points geometry={pointsGeo}>
        <pointsMaterial color="#9db4ff" size={0.045} sizeAttenuation transparent opacity={0.9} />
      </points>
    </group>
  );
}

function DriftingField() {
  const ref = useRef<THREE.Points>(null);
  const count = 260;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.015;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.02} sizeAttenuation transparent opacity={0.5} />
    </points>
  );
}

export default function PyramidScene() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas camera={{ position: [0, 0.4, 6], fov: 42 }} dpr={[1, 1.6]}>
        <ambientLight intensity={0.4} />
        <DriftingField />
        <WireframePyramid />
      </Canvas>
    </div>
  );
}
