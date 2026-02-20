import imageCompression from 'browser-image-compression';

export const compressImage = async (file: File): Promise<File> => {
  const options = {
    maxSizeMB: 0.3,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    fileType: 'image/webp'
  };

  try {
    const compressedFile = await imageCompression(file, options);
    const newFileName = file.name.replace(/\.[^/.]+$/, "") + ".webp";
    return new File([compressedFile], newFileName, { type: 'image/webp' });
  } catch (error) {
    console.error("Erreur de compression:", error);
    return file; //si ca plante on renvoie l'original
  }
};