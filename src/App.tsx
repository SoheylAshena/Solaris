import { CameraControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import StarField from "./components/star-field";
import MusicModel from "./components/music-model";
import { Suspense, useEffect, useState } from "react";
import CurrentMusicModel from "./components/current-music-model";
import { loadSongsFromIndexedDB } from "./services/database";
import type { Song } from "./types";
import MusicFolderSelector from "./components/music-folder-selector";

const App = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  // const [currentSongID, setCurrentSongID] = useState<string | null>(null);

  useEffect(() => {
    const loadSongs = async () => {
      if (songs.length === 0) {
        try {
          const dbSongs = await loadSongsFromIndexedDB();
          if (dbSongs.length > 0) {
            setIsLoaded(true);
            setSongs(dbSongs);
          }
        } catch (error) {
          console.error("Failed to load songs from database:", error);
        }
      }
      setIsLoading(false);
    };
    loadSongs();
  }, [isLoaded]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center gap-5 bg-black">
        <h2 className="drop-shadow-glow mb-4 bg-linear-to-r from-fuchsia-400 via-cyan-400 to-blue-400 bg-clip-text text-3xl font-bold text-transparent">
          Loading...
        </h2>
      </div>
    );
  }

  if (songs.length === 0) {
    return (
      <div className="flex h-screen w-screen items-center justify-center gap-5 bg-black">
        <MusicFolderSelector
          setIsLoading={setIsLoading}
          setIsLoaded={setIsLoaded}
        />
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 h-screen w-full bg-gray-950">
      <Canvas camera={{ position: [0, 0, 10], fov: 35 }}>
        <CameraControls />
        <StarField count={60000} />
        <Suspense fallback={null}>
          {songs.map((song, index) => {
            if (index > 9) return;
            return (
              <MusicModel
                key={song.id}
                position={[2.5, index * -1.15, 0]}
                title={song.title}
                artist={song.artist}
                duration={song.duration}
                id={song.id}
              />
            );
          })}
        </Suspense>
        <Suspense fallback={null}>
          <CurrentMusicModel position={[-2.5, 0, 0]} scale={0.8} />
        </Suspense>
        <pointLight position={10} intensity={500} />
        <pointLight position={-10} intensity={500} />
      </Canvas>
    </div>
  );
};

export default App;
