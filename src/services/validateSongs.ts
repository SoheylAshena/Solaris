import type { Song } from "@/types";

export const validateSongs = (
  results: PromiseSettledResult<Song | undefined>[]
) => {
  const validSongs = results
    .filter(
      (result): result is PromiseFulfilledResult<Song> =>
        result.status === "fulfilled" && result.value !== undefined
    )
    .map((result) => result.value);

  if (validSongs.length === 0) {
    throw new Error("Failed to process any audio files");
  }
  return validSongs;
};
