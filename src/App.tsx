import { CameraControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import StarField from "./components/star-field";
import MusicModel from "./components/music-model";
import { Suspense } from "react";
import CurrentMusicModel from "./components/current-music-model";

const App = () => (
  <div className="fixed top-0 left-0 w-full h-screen bg-gray-950">
    <Canvas camera={{ position: [0, 0, 10], fov: 35 }}>
      <CameraControls />
      <StarField count={60000} />
      <Suspense fallback={null}>
        <MusicModel position={[2.5, 0, 0]} />
      </Suspense>
      <Suspense fallback={null}>
        <CurrentMusicModel position={[-2.5, 0, 0]} scale={0.8} />
      </Suspense>
      <pointLight position={10} intensity={500} />
      <pointLight position={-10} intensity={500} />
    </Canvas>
  </div>
);

export default App;
