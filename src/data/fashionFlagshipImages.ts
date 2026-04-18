/**
 * 服饰「旗舰店」风格：每槽位独立 seed，与婚摄/彩妆等模块所用图互不重复。
 * 图源 Picsum（https://picsum.photos）；版式参考常见服饰电商，非品牌官网扒图。
 */
import { stockPic as p } from './mediaUtils'

export const fashionFlagship = {
  hero: p('xhdsg-fashion-hero-wide', 1920, 960),
  mens: p('xhdsg-fashion-cat-mens', 900, 620),
  womens: p('xhdsg-fashion-cat-womens', 900, 620),
  kids: p('xhdsg-fashion-cat-kids', 900, 620),
  custom: p('xhdsg-fashion-cat-custom', 900, 620),
  themeLeft: p('xhdsg-fashion-theme-left', 1200, 640),
  themeRight: p('xhdsg-fashion-theme-right', 1200, 640),
  pick1: p('xhdsg-fashion-pick-01', 800, 520),
  pick2: p('xhdsg-fashion-pick-02', 800, 520),
  pick3: p('xhdsg-fashion-pick-03', 800, 520),
} as const
