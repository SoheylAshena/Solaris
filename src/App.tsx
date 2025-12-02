import { CameraControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import StarField from "./components/star-field";

const App = () => (
  <div className="fixed top-0 left-0 w-full h-screen bg-gray-950">
    <Canvas>
      <CameraControls />
      <StarField count={8000} />
    </Canvas>
  </div>
);

export default App;
