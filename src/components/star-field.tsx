const StarField = ({ count = 1000, minRadius = 50, maxRadius = 200 }) => {
  const starsCount = count;

  const colors = new Float32Array(count * 3);
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < starsCount; i++) {
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);
    const radius = minRadius + Math.random() * (maxRadius - minRadius);

    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

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

    colors[i * 3] = r;
    colors[i * 3 + 1] = g;
    colors[i * 3 + 2] = b;
  }

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach={"attributes-position"} args={[positions, 3]} />
        <bufferAttribute attach={"attributes-color"} args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.25} sizeAttenuation vertexColors />
    </points>
  );
};
export default StarField;
