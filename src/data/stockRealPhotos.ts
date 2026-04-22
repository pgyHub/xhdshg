/**
 * 演示用真实摄影外链（非 SVG 示意）。
 * - Unsplash：婚摄/美妆主视觉/美发门店/服装卖场等已人工核对可访问。
 * - Picsum：其余槽位用固定 id，稳定可加载；画面与业务为弱相关，上线请换自有 CDN。
 */
const U = (photoId: string) =>
  `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=1600&q=85`

const P = (id: number) => `https://picsum.photos/id/${id}/1600/1000`

export const UNSPLASH = {
  weddingCity: U('1519741497674-611481863552'),
  weddingCouple: U('1511285560929-80b456fea0bc'),
  weddingCeremony: U('1516975080664-ed2fc6a32937'),
  weddingDress: U('1515934751635-c81c6bc9a2d8'),
  beautyFace: U('1522337360788-8b13dee7a37e'),
  barbershop: U('1585747860715-2ba37e788b70'),
  fashionBoutique: U('1441986300917-64674bd600d8'),
} as const

/** 首页七大业务卡片 */
export const homePageCardImages = {
  hair: UNSPLASH.barbershop,
  makeup: UNSPLASH.beautyFace,
  wedding: UNSPLASH.weddingCity,
  fashion: '/images/fashion/user/fs-real-001.png',
  home: '/images/home/user/home-real-001.png',
  /** 本地实拍菜品，已是真实摄影，保留 */
  restaurant: '/images/restaurant/dish-13-jitang-hero.png',
  video: P(89),
} as const

export const hairPageImages = {
  hero: UNSPLASH.barbershop,
  g1: P(21),
  g2: P(22),
  g3: P(23),
  l1: P(24),
  l2: P(25),
  l3: P(26),
  l4: P(27),
  l5: P(28),
  l6: P(29),
  p1: P(30),
  p2: P(31),
  p3: P(32),
  s1: P(33),
  s2: P(34),
  s3: P(35),
} as const

export const makeupPageImages = {
  hero: UNSPLASH.beautyFace,
  g1: P(40),
  g2: P(41),
  g3: P(42),
  l1: P(43),
  l2: P(44),
  l3: P(45),
  l4: P(46),
  l5: P(47),
  l6: P(49),
  p1: P(50),
  p2: P(51),
  p3: P(52),
  s1: P(53),
  s2: P(54),
  s3: P(55),
} as const

export const weddingStock = {
  g1: '/images/wedding/user/wed-real-001.png',
  g2: '/images/wedding/user/wed-real-002.png',
  g3: '/images/wedding/user/wed-real-003.png',
  l1: '/images/wedding/user/wed-real-004.png',
  l2: '/images/wedding/user/wed-real-005.png',
  l3: '/images/wedding/user/wed-real-006.png',
  l4: '/images/wedding/user/wed-real-007.png',
  l5: '/images/wedding/user/wed-real-009.png',
  l6: '/images/wedding/user/wed-real-010.png',
  p1: '/images/wedding/user/wed-real-011.png',
  p2: '/images/wedding/user/wed-real-012.png',
  p3: '/images/wedding/user/wed-real-013.png',
  s1: '/images/wedding/user/wed-real-014.png',
  s2: '/images/wedding/user/wed-real-019.png',
  s3: '/images/wedding/user/wed-real-020.png',
} as const

export const homeStock = {
  hero: '/images/home/user/home-real-001.png',
  g1: '/images/home/user/home-real-018.png',
  g2: '/images/home/user/home-real-017.png',
  g3: '/images/home/user/home-real-020.png',
  l1: '/images/home/user/home-real-002.png',
  l2: '/images/home/user/home-real-003.png',
  l3: '/images/home/user/home-real-004.png',
  l4: '/images/home/user/home-real-005.png',
  l5: '/images/home/user/home-real-006.png',
  l6: '/images/home/user/home-real-007.png',
  p1: '/images/home/user/home-real-008.png',
  p2: '/images/home/user/home-real-009.png',
  p3: '/images/home/user/home-real-010.png',
  s1: '/images/home/user/home-real-011.png',
  s2: '/images/home/user/home-real-012.png',
  s3: '/images/home/user/home-real-013.png',
} as const

export const videoStock = {
  hero: P(88),
  g1: P(90),
  g2: P(91),
  g3: P(92),
  l1: P(93),
  l2: P(94),
  l3: P(95),
  l4: P(96),
  l5: P(97),
  l6: P(98),
  p1: P(99),
  p2: P(100),
  p3: P(101),
  s1: P(68),
  s2: P(69),
  s3: P(70),
} as const

export const fashionFlagship = {
  hero: '/images/fashion/user/fs-real-002.png',
  mens: '/images/fashion/user/fs-real-003.png',
  womens: '/images/fashion/user/fs-real-020.png',
  kids: '/images/fashion/user/fs-real-018.png',
  custom: '/images/fashion/user/fs-real-011.png',
  themeLeft: '/images/fashion/user/fs-real-019.png',
  themeRight: '/images/fashion/user/fs-real-017.png',
  pick1: '/images/fashion/user/fs-real-016.png',
  pick2: '/images/fashion/user/fs-real-014.png',
  pick3: '/images/fashion/user/fs-real-015.png',
} as const

export const fashionIndustryMedia = {
  layoutNewTheme: '/images/fashion/user/fs-real-004.png',
  layoutCategoryMosaic: '/images/fashion/user/fs-real-005.png',
  layoutSizingAssistant: '/images/fashion/user/fs-real-006.png',
  layoutMaterialTags: '/images/fashion/user/fs-real-007.png',
  layoutBundleRecommend: '/images/fashion/user/fs-real-008.png',
  layoutMemberCare: '/images/fashion/user/fs-real-009.png',
  mockShirt: '/images/fashion/user/fs-real-010.png',
  mockSuit: '/images/fashion/user/fs-real-012.png',
  mockEnterprise: '/images/fashion/user/fs-real-013.png',
  showcaseCommute: '/images/fashion/user/fs-real-001.png',
  showcaseFormal: '/images/fashion/user/fs-real-010.png',
  showcaseTeam: '/images/fashion/user/fs-real-003.png',
} as const
