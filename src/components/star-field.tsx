import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Points } from "three";

const StarField = ({ count = 1000, minRadius = 50, maxRadius = 200 }) => {
  const pointsRef = useRef<Points>(null);

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotateX(0.00004);
    }
  });

  const positions = () => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = minRadius + Math.random() * (maxRadius - minRadius);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    return pos;
  };

  const colors = () => {
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      let r, g, b;
      const colorType = Math.random();
      if (colorType < 0.3) {
        r = 0;
        g = 1;
        b = 1;
      } else if (colorType < 0.6) {
        r = 1;
        g = 1;
        b = 1;
      } else if (colorType < 0.9) {
        r = 1;
        g = 0.2;
        b = 0.5;
      } else {
        r = 1;
        g = 0.2;
        b = 1;
      }

      col[i * 3] = r;
      col[i * 3 + 1] = g;
      col[i * 3 + 2] = b;
    }
    return col;
  };

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions(), 3]} />
        <bufferAttribute attach="attributes-color" args={[colors(), 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.25} vertexColors sizeAttenuation />
    </points>
  );
};

export default StarField;
