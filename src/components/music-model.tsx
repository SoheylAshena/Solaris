import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/Addons.js";
import { useRef } from "react";
import model_file from "../maya/music-info.obj";
import type { Group } from "three";
import ModelLoader from "./model-loader";
import HTMLModel from "./html-model";
import type { SongItemProps } from "@/types";
import { useSongImage } from "@/hooks/useSongImage";
import musicImage from "@/assets/music.jpg";
import { formatDuration } from "@/utils/formatDuration";

interface MusicModelProps extends SongItemProps {
  position?: [number, number, number];
  scale?: number;
}

const MusicModel: React.FC<MusicModelProps> = ({
  position,
  scale,
  title,
  artist,
  duration,
  id,
}) => {
  const objectRef = useRef<Group>(null);
  const importedModel = useLoader(OBJLoader, model_file);
  const musicInfoMesh = importedModel.children[0];
  const imageURL = useSongImage(id);

  return (
    <group ref={objectRef} position={position} scale={scale}>
      <ModelLoader model={musicInfoMesh} scale={0.3}>
        <meshStandardMaterial
          attach={`material-0`}
          color={"white"}
          metalness={1}
          roughness={0.3}
        />
        <meshStandardMaterial
          attach={`material-1`}
          color={"black"}
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
        width="508px"
        height="127px"
        borderRadius="30px"
        position={[0, 0, 0.3]}
      >
        <div className="group animate-fade-in h-full w-full cursor-pointer rounded-xl border border-white/10 bg-linear-to-r from-fuchsia-900/40 via-cyan-900/30 to-blue-900/40 p-2 px-5 shadow-md transition-all hover:from-fuchsia-600/40 hover:to-blue-600/40 hover:shadow-xl">
          <div className="flex items-center justify-between gap-4">
            <img
              className="h-28 w-28 rounded-md object-cover"
              src={imageURL || musicImage}
            />
            <div className="flex-1">
              <div className="drop-shadow-glow font-semibold text-fuchsia-200 group-hover:text-fuchsia-300">
                {title}
              </div>
              <div className="text-sm text-cyan-200 italic group-hover:text-cyan-100">
                {artist}
              </div>
            </div>
            <span className="font-mono text-sm text-blue-200 group-hover:text-blue-100">
              {formatDuration(duration)}
            </span>
          </div>
        </div>
      </HTMLModel>
    </group>
  );
};

export default MusicModel;
