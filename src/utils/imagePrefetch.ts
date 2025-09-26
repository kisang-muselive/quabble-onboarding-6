export type ScreenType = 
  | 'whyquabblewhatyouneed' 
  | '10mworkoutcompleted'
  | 'foundationofmeaningfullife'
  | 'howhaveyoubeen'
  | 'gladtohearthat'
  | 'sorrytohearthat'
  | 'dealingwith'
  | 'heretohelp'
  | 'professionalcareisimportant'
  | '98report'
  | '87report'
  | 'backedbyexperts'
  | 'finalstep'
  | 'wakeup'
  | 'gotobed'
  | 'interestgrid'
  | 'supportsystem'
  | 'agegroup'
  | 'customizing'
  | 'routineready'
  | 'joining10m'
  | 'workoutlist'
  | 'fivestars'
  | 'depressionsurvey1'
  | 'depressionsurvey2'
  | 'depressionsurvey3'
  | 'anxietysurvey1'
  | 'anxietysurvey2'
  | 'anxietysurvey3';

const SCREEN_IMAGES: Record<ScreenType, string[]> = {
  whyquabblewhatyouneed: ['/images/why-quabble-duck.png'],
  '10mworkoutcompleted': ['/images/7-reviews.png'],
  foundationofmeaningfullife: ['/images/mind-quote-background.png'],
  howhaveyoubeen: ['/images/1-duck.png'],
  gladtohearthat: ['/images/we-can-help-background.png', '/images/we-can-help-duck.png'],
  sorrytohearthat: ['/images/sorry-to-hear-duck.png'],
  dealingwith: ['/images/dealing-with-duck.png'],
  heretohelp: ['/images/we-can-help-background.png'],
  professionalcareisimportant: ['/images/we-can-help-background.png'],
  '98report': ['/images/98stat.png'],
  '87report': ['/images/87stat.png'],
  backedbyexperts: ['/images/therapist-duck.png'],
  finalstep: ['/images/reportduck.png'],
  wakeup: ['/images/16-duck.png', '/images/17-background.png'],
  gotobed: ['/images/sleepingduck.png', '/images/18-background.png'],
  interestgrid: [
    '/images/21-icon-1.png', '/images/21-icon-2.png', '/images/21-icon-3.png',
    '/images/21-icon-4.png', '/images/21-icon-5.png', '/images/21-icon-6.png',
    '/images/21-icon-7.png', '/images/21-icon-8.png', '/images/21-icon-9.png'
  ],
  supportsystem: ['/images/supportingduck.png'],
  agegroup: ['/images/2-duck.png'],
  customizing: ['/images/quotationmarks.svg'],
  routineready: [
    '/images/24-sun.png', '/images/24-smoothie.png', 
    '/images/24-moon.png', '/images/24-jar.png'
  ],
  joining10m: ['/images/qubblefriendscelebrating.png'],
  workoutlist: [
    '/images/quabble-tool-1.png', '/images/quabble-tool-2.png', '/images/quabble-tool-3.png',
    '/images/quabble-tool-4.png', '/images/quabble-tool-5.png', '/images/quabble-tool-6.png',
    '/images/quabble-tool-7.png', '/images/quabble-tool-8.png', '/images/quabble-tool-9.png',
    '/images/quabble-tool-10.png', '/images/quabble-tool-11.png', '/images/quabble-tool-12.png',
    '/images/quabble-tool-13.png', '/images/quabble-tool-14.png', '/images/quabble-tool-15.png',
    '/images/quabble-tool-16.png', '/images/quabble-tool-17.png', '/images/quabble-tool-18.png'
  ],
  fivestars: ['/images/testimonial-background.png', '/images/reviewstars.svg', '/images/yellow5stars.svg'],
  depressionsurvey1: ['/images/pointingduck.png', '/images/Circle.svg', '/images/Check_circle_fill.svg'],
  depressionsurvey2: ['/images/explainingduck.png'],
  depressionsurvey3: ['/images/calmduck.png'],
  anxietysurvey1: ['/images/pointingduck.png', '/images/Circle.svg', '/images/Check_circle_fill.svg'],
  anxietysurvey2: ['/images/explainingduck.png'],
  anxietysurvey3: ['/images/calmduck.png']
};

const SCREEN_SEQUENCE: ScreenType[] = [
  'whyquabblewhatyouneed', '10mworkoutcompleted', 'foundationofmeaningfullife',
  'howhaveyoubeen', 'gladtohearthat', 'sorrytohearthat', 'dealingwith',
  'heretohelp', 'professionalcareisimportant', '98report', '87report',
  'backedbyexperts', 'finalstep', 'wakeup', 'gotobed', 'interestgrid',
  'supportsystem', 'agegroup', 'customizing', 'routineready', 'joining10m',
  'workoutlist', 'fivestars', 'depressionsurvey1', 'depressionsurvey2',
  'depressionsurvey3', 'anxietysurvey1', 'anxietysurvey2', 'anxietysurvey3'
];

const prefetchedImages = new Set<string>();

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (prefetchedImages.has(src)) {
      resolve();
      return;
    }

    // JSON 파일들(Lottie 애니메이션)은 이미지 프리로딩에서 제외
    if (src.endsWith('.json')) {
      console.log(`Skipping JSON file: ${src}`);
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

// 다음 2-3개 화면의 이미지들을 미리 로딩
export function prefetchImagesForScreen(currentScreen: ScreenType): void {
  const currentIndex = SCREEN_SEQUENCE.indexOf(currentScreen);
  if (currentIndex === -1) return;

  // 다음 3개 화면의 이미지들을 프리로드 (더 많은 화면을 미리 준비)
  const screensToPreload = SCREEN_SEQUENCE.slice(currentIndex + 1, currentIndex + 4);
  
  screensToPreload.forEach(screenType => {
    const images = SCREEN_IMAGES[screenType] || [];
    images.forEach(imageSrc => {
      preloadImage(imageSrc).catch(() => { /* Ignore preload errors */ });
    });
  });
}

// 앱 시작시 가장 중요한 이미지들을 먼저 로딩
export function prefetchAllCriticalImages(): void {
  const criticalImages = [
    '/images/arrow_left.svg', // 모든 화면에서 사용되는 뒤로가기 버튼
    '/images/why-quabble-duck.png', // 첫 화면
    '/images/7-reviews.png', // 두 번째 화면
    '/images/1-duck.png', // 자주 사용되는 오리 이미지
    '/images/we-can-help-background.png', // 여러 화면에서 사용
  ];

  criticalImages.forEach(imageSrc => {
    preloadImage(imageSrc).catch(() => { /* Ignore preload errors */ });
  });
}

// 백그라운드에서 모든 이미지를 천천히 프리로드
export function prefetchAllImagesInBackground(): void {
  const allImages = new Set<string>();
  
  // 모든 화면의 이미지들을 수집
  Object.values(SCREEN_IMAGES).forEach(images => {
    images.forEach(img => allImages.add(img));
  });

  // 일반적으로 사용되는 공통 이미지들 추가
  const commonImages = [
    '/images/arrow_left.svg',
    '/images/Circle.svg',
    '/images/Check_circle_fill.svg'
  ];
  
  commonImages.forEach(img => allImages.add(img));

  // 배치로 나누어서 프리로드 (네트워크 부하 방지)
  const imageArray = Array.from(allImages);
  const batchSize = 5;
  let currentBatch = 0;

  const loadNextBatch = () => {
    const start = currentBatch * batchSize;
    const end = start + batchSize;
    const batch = imageArray.slice(start, end);

    if (batch.length === 0) return;

    Promise.allSettled(batch.map(img => preloadImage(img)))
      .then(() => {
        currentBatch++;
        // 다음 배치를 약간의 지연 후 로드 (메인 스레드 블로킹 방지)
        setTimeout(loadNextBatch, 100);
      });
  };

  // 초기 중요 이미지들이 로드된 후 시작
  setTimeout(loadNextBatch, 2000);
}

// 특정 화면 그룹의 이미지들을 한번에 프리로드
export function prefetchImageGroup(screens: ScreenType[]): void {
  screens.forEach(screen => {
    const images = SCREEN_IMAGES[screen] || [];
    images.forEach(imageSrc => {
      preloadImage(imageSrc).catch(() => { /* Ignore preload errors */ });
    });
  });
}

// 프리로드 상태 확인
export function getPreloadedImageCount(): number {
  return prefetchedImages.size;
}

// 특정 이미지가 프리로드되었는지 확인
export function isImagePreloaded(src: string): boolean {
  return prefetchedImages.has(src);
}