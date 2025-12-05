import type { Song } from "@/types";
import { isAudioFile } from "@/utils/isAudioFile";
import { saveSongImage, saveSongMetadata } from "@/services/database";
import { extractSongMetadata } from "./extractSongMetadata";
import { validateSongs } from "./validateSongs";

export const handleFolderProcess = async (files: File[]) => {
  try {
    const songs = await handleFilesSelected(files);

    const results = await Promise.all(
      songs.map(async (song) => {
        const { picture, ...metadata } = song;
        const savedMetadata = await saveSongMetadata(metadata);
        if (picture) {
          await saveSongImage(song.id, picture.data, picture.format);
        }
        return savedMetadata;
      })
    );
    return results;
  } catch (error) {
    console.error("Failed to process audio files:", error);
    throw error;
  }
};

const handleFilesSelected = async (files: File[]): Promise<Song[]> => {
  const audioFiles = files.filter(isAudioFile);

  if (audioFiles.length === 0) {
    throw new Error("No audio files found in selection");
  }

  const results = await Promise.allSettled(
    audioFiles.map((file) => extractSongMetadata(file))
  );

  return validateSongs(results);
};
