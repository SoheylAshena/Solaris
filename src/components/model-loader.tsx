import { Center, Clone } from "@react-three/drei";
import type { Object3D } from "three";

interface ModelLoaderProps {
  model: Object3D;
  scale?: number;
  children?: React.ReactNode;
}

const ModelLoader: React.FC<ModelLoaderProps> = ({
  model,
  scale,
  children,
}) => {
  return (
    <Center>
      <Clone object={model} scale={scale}>
        {children}
      </Clone>
    </Center>
  );
};

export default ModelLoader;
