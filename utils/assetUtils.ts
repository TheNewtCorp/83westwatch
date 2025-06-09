// src/utils/assetUtils.ts

export const preloadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve) => { // Removed reject to always resolve
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => {
      // console.warn(`Failed to preload image: ${src}, but proceeding.`);
      resolve(img); // Resolve even on error. Browser will try again when in DOM.
    };
    img.src = src;
  });
};

export const preloadAssets = async (paths: string[]): Promise<void> => {
  if (!paths || paths.length === 0) {
    return;
  }
  const validPaths = paths.filter(path => typeof path === 'string' && path.trim() !== '');
  if (validPaths.length > 0) {
    await Promise.all(validPaths.map(preloadImage));
  }
};
