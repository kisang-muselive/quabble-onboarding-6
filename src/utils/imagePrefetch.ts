export type ScreenType = 'whyquabblewhatyouneed' | 'duckwithjar';

const SCREEN_IMAGES: Record<ScreenType, string[]> = {
  whyquabblewhatyouneed: ['/images/why-quabble-duck.png'],
  duckwithjar: ['/images/8-background.jpg', '/images/8-duck.png']
};

const SCREEN_SEQUENCE: ScreenType[] = [
  'whyquabblewhatyouneed', 'duckwithjar'
];

const prefetchedImages = new Set<string>();

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (prefetchedImages.has(src)) {
      resolve();
      return;
    }

    const img = new Image();
    img.onload = () => {
      prefetchedImages.add(src);
      resolve();
    };
    img.onerror = () => {
      console.warn(`Failed to preload image: ${src}`);
      reject(new Error(`Failed to load ${src}`));
    };
    img.src = src;
  });
}

export function prefetchImagesForScreen(currentScreen: ScreenType): void {
  const currentIndex = SCREEN_SEQUENCE.indexOf(currentScreen);
  if (currentIndex === -1) return;

  const screensToPreload = SCREEN_SEQUENCE.slice(currentIndex + 1, currentIndex + 2);
  
  screensToPreload.forEach(screenType => {
    const images = SCREEN_IMAGES[screenType];
    images.forEach(imageSrc => {
      preloadImage(imageSrc).catch(() => { /* Ignore preload errors */ });
    });
  });
}

export function prefetchAllCriticalImages(): void {
  const criticalImages = [
    '/images/why-quabble-duck.png',
    '/images/8-background.jpg'
  ];

  criticalImages.forEach(imageSrc => {
    preloadImage(imageSrc).catch(() => { /* Ignore preload errors */ });
  });
}