export const isAudioFile = (file: File): boolean =>
  file.type.startsWith("audio/");
