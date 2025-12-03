import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/Addons.js";
import { useRef } from "react";
import model_file from "../maya/music-info.obj";
import type { Mesh } from "three";

interface MusicModelProps {
  position?: [number, number, number];
  scale?: number;
}

const MusicModel: React.FC<MusicModelProps> = ({
  position = [0, -1, 0],
  scale = 0.3,
}) => {
  const meshRef = useRef<Mesh>(null);
  const importedModel = useLoader(OBJLoader, model_file);
  const musicInfoMesh = importedModel.children[0];

  return (
    <primitive
      ref={meshRef}
      object={musicInfoMesh}
      position={position}
      scale={scale}
    >
      <meshStandardMaterial
        attach={`material-0`}
        color={"white"}
        metalness={1}
        roughness={0.3}
      />
      <meshStandardMaterial
        attach={`material-1`}
        color={"black"}
        emissive={"white"}
        emissiveIntensity={1}
        roughness={0}
      />
      <meshStandardMaterial
        attach={`material-2`}
        color={"white"}
        metalness={1}
        roughness={0.3}
      />
    </primitive>
  );
};

export default MusicModel;
