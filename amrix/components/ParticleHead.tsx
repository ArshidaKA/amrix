"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function HeadPoints() {
  const ref = useRef<THREE.Points>(null);
  const count = 1400;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Sample points on/near an ellipsoid "head" shape with jitter for an organic dot-matrix look
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.15 + (Math.random() - 0.5) * 0.12;
      let x = r * Math.sin(phi) * Math.cos(theta) * 0.85;
      let y = r * Math.cos(phi) * 1.15;
      let z = r * Math.sin(phi) * Math.sin(theta);

      // taper toward a jaw
      if (y < -0.3) {
        x *= 0.7;
        z *= 0.7;
      }

      arr[i * 3] = x;
      arr[i * 3 + 1] = y * 0.9;
      arr[i * 3 + 2] = z * 0.6 - 0.1;
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.18;
      const targetX = (state.pointer.y * 0.15);
      ref.current.rotation.x += (targetX - ref.current.rotation.x) * 0.05;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#9db4ff" size={0.02} sizeAttenuation transparent opacity={0.85} />
    </points>
  );
}

export default function ParticleHead() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 3.4], fov: 40 }} dpr={[1, 1.6]}>
        <HeadPoints />
      </Canvas>
    </div>
  );
}
