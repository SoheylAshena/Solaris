import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/Addons.js";
import { useRef } from "react";
import model_file from "../maya/current-music.obj";
import type { Group } from "three";
import ModelLoader from "./model-loader";
import HTMLModel from "./html-model";

interface CurrentMusicModelProps {
  position?: [number, number, number];
  scale?: number;
}

const CurrentMusicModel: React.FC<CurrentMusicModelProps> = ({
  position,
  scale,
}) => {
  const objectRef = useRef<Group>(null);
  const importedModel = useLoader(OBJLoader, model_file);
  const musicInfoMesh = importedModel.children[0];

  return (
    <group ref={objectRef} position={position} scale={scale}>
      <ModelLoader model={musicInfoMesh} scale={0.2}>
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
      </ModelLoader>
      <HTMLModel
        width="485px"
        height="485px"
        borderRadius="50%"
        position={[0, 0, 0.05]}
      >
        <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-purple-400 to-pink-500 text-3xl font-bold text-white">
          Album Art
        </div>
      </HTMLModel>
    </group>
  );
};

export default CurrentMusicModel;
