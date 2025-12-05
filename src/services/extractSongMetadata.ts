import { parseBlob } from "music-metadata";
import { createSongFromMetadata } from "./createSongFromMetadata";
import type { Song } from "../types";

export const extractSongMetadata = async (
  file: File
): Promise<Song | undefined> => {
  try {
    const metadata = await parseBlob(file);
    return createSongFromMetadata(metadata, file);
  } catch (error) {
    console.error(`Error extracting metadata from ${file.name}:`, error);
    return undefined;
  }
};
