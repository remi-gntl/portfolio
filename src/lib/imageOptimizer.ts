import imageCompression from 'browser-image-compression';

export const compressImage = async (file: File): Promise<File> => {
  const options = {
    maxSizeMB: 0.3,          // On vise ~300KB max (super léger)
    maxWidthOrHeight: 1920,  // On redimensionne si c'est de la 4K inutile
    useWebWorker: true,      // Pour ne pas geler l'interface
    fileType: 'image/webp'   // Conversion forcée en WebP
  };

  try {
    const compressedFile = await imageCompression(file, options);
    // On garde le nom d'origine mais on change l'extension
    const newFileName = file.name.replace(/\.[^/.]+$/, "") + ".webp";
    return new File([compressedFile], newFileName, { type: 'image/webp' });
  } catch (error) {
    console.error("Erreur de compression:", error);
    return file; // Si ça plante, on renvoie l'original
  }
};