import { CameraControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import StarField from "./components/star-field";
import MusicModel from "./components/music-model";

const App = () => (
  <div className="fixed top-0 left-0 w-full h-screen bg-gray-950">
    <Canvas camera={{ position: [0, 0, 5], fov: 35 }}>
      <CameraControls />
      <StarField count={30000} />
      <Suspense fallback={null}>
        <MusicModel position={[3, 0, 0]} />
      </Suspense>

      <pointLight position={10} intensity={500} />
      <pointLight position={-10} intensity={500} />
    </Canvas>
  </div>
);

export default App;
