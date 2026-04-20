/**
 * 服装定制模块配图：首屏用 Unsplash，下方 Industry 区用 Pexels，**全页 22 张互不重复**（避免滚动时重复出现同图）。
 * 两类均为固定 ID、非随机占位；上线可替换为自有实拍或已购授权素材。
 */
const unsplashClothing = (photoId: string, w: number, h: number) =>
  `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=${Math.round(w)}&h=${Math.round(h)}&q=80`

/** 与 fashionFlagship 任意 URL 不重复；仅用于服装定制页 Industry 区块 */
const pexelsFashion = (photoId: number, w: number, h: number) =>
  `https://images.pexels.com/photos/${photoId}/pexels-photo-${photoId}.jpeg?auto=compress&cs=tinysrgb&w=${Math.round(w)}&h=${Math.round(h)}&fit=crop`

export const fashionFlagship = {
  /** 服饰零售空间 / 陈列 */
  hero: unsplashClothing('1441984904996-e0b6ba687e04', 1920, 960),
  /** 男装衬衫与正装陈列 */
  mens: unsplashClothing('1503341504253-dff4815485f1', 900, 620),
  /** 女装穿搭展示 */
  womens: unsplashClothing('1515886657613-9f3515b0c78f', 900, 620),
  /** 童装 / 亲子穿搭 */
  kids: unsplashClothing('1503454537195-1dcabb73ffb9', 900, 620),
  /** 量体 / 门店接待与面料沟通 */
  custom: unsplashClothing('1560250097-0b93528c311a', 900, 620),
  /** 门店衣架与陈列 */
  themeLeft: unsplashClothing('1445205170230-053b83016050', 1200, 640),
  /** 叠放衣物 / 搭配平铺 */
  themeRight: unsplashClothing('1490481651871-ab68de25d43d', 1200, 640),
  /** 橱窗与穿搭展示 */
  pick1: unsplashClothing('1469334031218-e382a71b716b', 800, 520),
  /** 牛仔与休闲质感 */
  pick2: unsplashClothing('1549298916-b41d501d3772', 800, 520),
  /** 衣架与基础款陈列 */
  pick3: unsplashClothing('1539533018447-63fcce2678e3', 800, 520),
} as const

/** 布局模块 / 推荐服务 / 作品展示 — 各键对应独立成片，不与 fashionFlagship 重复 */
export const fashionIndustryMedia = {
  layoutNewTheme: pexelsFashion(1183266, 960, 640),
  layoutCategoryMosaic: pexelsFashion(1926769, 960, 640),
  layoutSizingAssistant: pexelsFashion(1536619, 960, 640),
  layoutMaterialTags: pexelsFashion(1346187, 960, 640),
  layoutBundleRecommend: pexelsFashion(2983464, 960, 640),
  layoutMemberCare: pexelsFashion(5709660, 960, 640),
  mockShirt: pexelsFashion(6311392, 800, 520),
  mockSuit: pexelsFashion(6311666, 800, 520),
  mockEnterprise: pexelsFashion(6311395, 800, 520),
  showcaseCommute: pexelsFashion(325876, 800, 520),
  showcaseFormal: pexelsFashion(934070, 800, 520),
  showcaseTeam: pexelsFashion(1124465, 800, 520),
} as const
