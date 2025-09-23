type ScreenType = 
  | 'referral' | 'age' | 'tooyoung' | 'duckjar' | 'askfeelingv2' | 'sorrytoheart' | 'havementalissue' | 'whatdealingwith' | 'wecanhelp' | 'whatdidyoutry' | 'whatfeltmissing' | 'whyquabble' | 'stats' | 'improvedproof' | 'whysomany' | 'letsfindout' | 'quabbletools' | 'therapist' | 'radar' | 'routineintro' | 'testimonialsv2' | 'areyouready' | 'gender' | 'duckjar' | 'focus' | 'confirmation' | 'achievement' | 'mindquote' | 'askfeelingv2' | 'testimonials' 
  | 'completion' | 'mentalwellness1' | 'mentalwellness2' | 'chart' | 'mentalwellness3' 
  | 'signup' | 'ducknaming' | 'tellusintro' | 'routine' | 'appfinale' | 'wakeup' 
  | 'goodnight' | 'mentalwellnessq1' | 'askfeeling' | 'askinterests' | 'supportsystem' 
  | 'customizeroutine' | 'recommendedroutineintro' | 'specialoffer';

const SCREEN_IMAGES: Record<ScreenType, string[]> = {
  referral: [],
  age: ['/images/2-duck.png'],
  tooyoung: ['/images/too-young-duck.png'],
  duckjar: ['/images/8-duck.png'],
  askfeelingv2: ['/images/1-duck.png'],
  sorrytoheart: ['/images/sorry-to-hear-duck.png'],
  havementalissue: ['/images/2-duck.png'],
  whatdealingwith: ['/images/dealing-with-duck.png'],
  wecanhelp: ['/images/we-can-help-background.png'],
  whatdidyoutry: ['/images/1-duck.png'],
  whatfeltmissing: ['/images/3-duck.png'],
  whyquabble: ['/images/why-quabble-duck.png'],
  stats: ['/images/98stat.png'],
  improvedproof: ['/images/improved-proof.png'],
  whysomany: [],
  letsfindout: [],
  quabbletools: [
    '/images/quabble-tool-1.png', '/images/quabble-tool-2.png', '/images/quabble-tool-3.png', '/images/quabble-tool-4.png',
    '/images/quabble-tool-5.png', '/images/quabble-tool-6.png', '/images/quabble-tool-7.png', '/images/quabble-tool-8.png',
    '/images/quabble-tool-9.png', '/images/quabble-tool-10.png', '/images/quabble-tool-11.png', '/images/quabble-tool-12.png',
    '/images/quabble-tool-13.png', '/images/quabble-tool-14.png', '/images/quabble-tool-15.png', '/images/quabble-tool-16.png',
    '/images/quabble-tool-17.png', '/images/quabble-tool-18.png'
  ],
  therapist: ['/images/therapist-duck.png'],
  radar: ['/images/radar.png'],
  routineintro: [
    '/images/routine-intro-1.png', '/images/routine-intro-2.png', '/images/routine-intro-3.png',
    '/images/routine-intro-4.png', '/images/routine-intro-5.png', '/images/routine-intro-6.png'
  ],
  testimonialsv2: ['/images/testimonial-background.png'],
  areyouready: ['/images/are-you-ready-duck.png'],
  gender: [],
  focus: ['/images/4-duck.png'],
  confirmation: [],
  achievement: ['/images/4-duck.png'],
  mindquote: ['/images/mind-quote-background.png'],
  testimonials: ['/images/7-duck.png', '/images/7-reviews.png'],
  completion: ['/images/15-background.png'],
  mentalwellness1: ['/images/8-background.jpg'],
  mentalwellness2: ['/images/9-background.jpg'],
  chart: ['/images/11-graph.png'],
  mentalwellness3: ['/images/10-background.jpg'],
  signup: ['/images/13-background.png'],
  ducknaming: ['/images/14-duck.png'],
  tellusintro: [],
  routine: [],
  appfinale: [],
  wakeup: ['/images/18-background.jpg'],
  goodnight: ['/images/19-background.jpg'],
  mentalwellnessq1: ['/images/20-background.jpg'],
  askfeeling: [],
  askinterests: [
    '/images/interests/art.png',
    '/images/interests/books.png',
    '/images/interests/cooking.png',
    '/images/interests/fitness.png',
    '/images/interests/gaming.png',
    '/images/interests/music.png',
    '/images/interests/nature.png',
    '/images/interests/socializing.png',
    '/images/interests/travel.png'
  ],
  supportsystem: ['/images/21-background.jpg'],
  customizeroutine: ['/images/22-background.png'],
  recommendedroutineintro: [],
  specialoffer: ['/images/3people.png']
};

const SCREEN_SEQUENCE: ScreenType[] = [
  'referral', 'age', 'gender', 'focus', 'confirmation', 'testimonials', 'completion',
  'mentalwellness1', 'mentalwellness2', 'chart', 'mentalwellness3', 'ducknaming',
  'tellusintro', 'wakeup', 'goodnight', 'mentalwellnessq1', 'askfeeling', 'askinterests',
  'supportsystem', 'customizeroutine', 'recommendedroutineintro', 'routine', 'specialoffer'
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

  const screensToPreload = SCREEN_SEQUENCE.slice(currentIndex + 1, currentIndex + 3);
  
  screensToPreload.forEach(screenType => {
    const images = SCREEN_IMAGES[screenType];
    images.forEach(imageSrc => {
      preloadImage(imageSrc).catch(() => { /* Ignore preload errors */ });
    });
  });
}

export function prefetchAllCriticalImages(): void {
  const criticalImages = [
    '/images/7-duck.png',
    '/images/7-reviews.png',
    '/images/11-graph.png',
    '/images/14-duck.png',
    '/images/15-background.png',
    '/images/22-background.png',
    // Add the slow-loading background images from the new onboarding flow
    '/images/mind-quote-background.png',
    '/images/we-can-help-background.png',
    '/images/why-quabble-duck.png',
    '/images/improved-proof.png',
    '/images/testimonial-background.png',
  ];

  criticalImages.forEach(imageSrc => {
    preloadImage(imageSrc).catch(() => { /* Ignore preload errors */ });
  });
}