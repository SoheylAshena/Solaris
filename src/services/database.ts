import { openDB } from "idb";
import type { Song } from "@/types";

const DB_NAME = "music-db";
const DB_VERSION = 1;
const SONGS_STORE = "songs-store";
const IMAGES_STORE = "images-store";

const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(SONGS_STORE)) {
      db.createObjectStore(SONGS_STORE, { keyPath: "id" });
    }
    if (!db.objectStoreNames.contains(IMAGES_STORE)) {
      db.createObjectStore(IMAGES_STORE);
    }
  },
});

export async function saveSongMetadata(song: Omit<Song, "picture">) {
  const db = await dbPromise;
  await db.put(SONGS_STORE, song);
  return song;
}

export async function saveSongImage(
  id: string,
  data: Uint8Array,
  format: string
) {
  const db = await dbPromise;
  await db.put(IMAGES_STORE, { data, format }, id);
}

export async function getSongImageBlobUrl(id: string): Promise<string | null> {
  const db = await dbPromise;
  const imageRecord = await db.get(IMAGES_STORE, id);

  if (!imageRecord) return null;

  const { data, format } = imageRecord as { data: Uint8Array; format: string };
  const blob = new Blob([data as Uint8Array<ArrayBuffer>], { type: format });
  return URL.createObjectURL(blob);
}

export async function loadSongsFromIndexedDB(): Promise<Song[]> {
  const db = await dbPromise;
  return await db.getAll(SONGS_STORE);
}

/**
 * Delete a single song (and its image) from IndexedDB
 */
export async function deleteSongFromIndexedDB(id: string): Promise<void> {
  const db = await dbPromise;
  await db.delete(SONGS_STORE, id);
  await db.delete(IMAGES_STORE, id);
}

/**
 * Clear all data from IndexedDB (songs + images)
 */
export async function clearDatabase(): Promise<void> {
  // Option 1: Clear each store (keeps database structure)
  const db = await dbPromise;
  const tx = db.transaction([SONGS_STORE, IMAGES_STORE], "readwrite");
  await Promise.all([
    tx.objectStore(SONGS_STORE).clear(),
    tx.objectStore(IMAGES_STORE).clear(),
  ]);
  await tx.done;

  // Option 2 (alternative): delete entire DB file
  // await deleteDB(DB_NAME); // uncomment if you want full deletion
}
