import { useState, useEffect } from "react";
import { getSongImageBlobUrl } from "@/services/database";

export const useSongImage = (songId: string | null) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!songId) return;

    const fetchImage = async () => {
      const url = await getSongImageBlobUrl(songId);
      setImageUrl(url);
    };

    fetchImage();
  }, [songId]);

  return imageUrl;
};
